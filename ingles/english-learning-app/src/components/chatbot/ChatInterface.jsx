import { useState, useEffect, useRef } from 'react'
import ApiKeyModal from './ApiKeyModal'
import MessageBubble from './MessageBubble'
import TypingIndicator from './TypingIndicator'
import ChatInput from './ChatInput'
import { createEnglishUtterance, setupVoiceLoading, speakEnglishText } from '../../utils/speech'
import { stripCorrectionsSection } from '../../utils/text'

const SYSTEM_PROMPT = `You are a friendly English conversation tutor helping a Spanish speaker practice English.

Guidelines:
- Be encouraging and conversational
- Keep responses concise (2-4 sentences)
- When you notice grammar or spelling errors, include corrections at the END of your response using this exact format:

  ✏️ Corrections:
  • "incorrect phrase" → "correct phrase" (brief explanation)

- Only correct significant errors (don't be overly pedantic)
- Respond naturally first, corrections second
- Be supportive and help build confidence`

export default function ChatInterface() {
  const [messages, setMessages] = useState([])
  const [isTyping, setIsTyping] = useState(false)
  const [apiKey, setApiKey] = useState(null)
  const [showApiKeyModal, setShowApiKeyModal] = useState(false)
  const [voicesLoaded, setVoicesLoaded] = useState(false)
  const [speakingMessageId, setSpeakingMessageId] = useState(null)
  const messagesEndRef = useRef(null)

  // Load API key and messages on mount
  useEffect(() => {
    const savedKey = localStorage.getItem('chatbot_api_key')
    if (savedKey) {
      setApiKey(savedKey)
    } else {
      setShowApiKeyModal(true)
    }

    const savedMessages = loadMessages()
    setMessages(savedMessages)
  }, [])

  // Load voices (same pattern as StoryReader)
  useEffect(() => {
    return setupVoiceLoading(() => setVoicesLoaded(true))
  }, [])

  // Auto-speak bot messages
  useEffect(() => {
    const lastMsg = messages[messages.length - 1]

    if (lastMsg &&
        lastMsg.role === 'assistant' &&
        !lastMsg.hasBeenSpoken &&
        !lastMsg.isError &&
        voicesLoaded) {

      // Clean content for speaking (remove correction markers)
      const speakContent = stripCorrectionsSection(lastMsg.content)
      speakEnglishText(speakContent, 0.9)

      setMessages(prev => prev.map((m, i) =>
        i === prev.length - 1 ? { ...m, hasBeenSpoken: true } : m
      ))
    }
  }, [messages, voicesLoaded])

  // Save messages to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      saveMessages(messages)
    }
  }, [messages])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  function loadMessages() {
    try {
      const saved = localStorage.getItem('chatbot_messages')
      if (!saved) return []

      const data = JSON.parse(saved)
      const weekAgo = Date.now() - (7 * 24 * 60 * 60 * 1000)

      return data.timestamp > weekAgo ? data.messages : []
    } catch (error) {
      console.error('Failed to load messages:', error)
      return []
    }
  }

  function saveMessages(msgs) {
    try {
      const data = {
        messages: msgs.slice(-50),
        timestamp: Date.now()
      }
      localStorage.setItem('chatbot_messages', JSON.stringify(data))
    } catch (error) {
      console.error('Failed to save messages:', error)
    }
  }

  function parseCorrections(botResponse) {
    const correctionMatch = botResponse.match(/✏️ Corrections:([\s\S]*?)(?:\n\n|$)/)

    if (!correctionMatch) return []

    const correctionText = correctionMatch[1]
    const corrections = []

    const correctionRegex = /•\s*"([^"]+)"\s*→\s*"([^"]+)"(?:\s*\(([^)]+)\))?/g
    let match

    while ((match = correctionRegex.exec(correctionText)) !== null) {
      corrections.push({
        original: match[1],
        corrected: match[2],
        explanation: match[3] || ''
      })
    }

    return corrections
  }

  function buildApiErrorMessage(status, apiMessage) {
    if (status === 400) {
      if (apiMessage?.includes('API_KEY_INVALID')) {
        return 'Invalid API key. Please check your key in Settings.'
      }
      return apiMessage || 'Invalid request. Please verify your input and try again.'
    }

    if (status === 401 || status === 403) {
      return 'Authentication failed. Please update your API key in Settings.'
    }

    if (status === 429) {
      return 'Too many requests. Please wait a moment and try again.'
    }

    if (status >= 500) {
      return 'The AI service is temporarily unavailable. Please try again shortly.'
    }

    return apiMessage || `API Error: ${status}`
  }

  async function sendMessage(userText) {
    if (!apiKey) {
      setShowApiKeyModal(true)
      return
    }

    setIsTyping(true)

    // Add user message immediately
    const userMsg = {
      id: crypto.randomUUID(),
      role: 'user',
      content: userText,
      timestamp: Date.now()
    }
    setMessages(prev => [...prev, userMsg])

    try {
      // Build conversation history for Gemini
      const conversationHistory = messages.slice(-10)
        .map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
        .join('\n\n')

      // Gemini doesn't have system role, so we include instructions in the prompt
      const fullPrompt = messages.length === 0
        ? `${SYSTEM_PROMPT}\n\nUser: ${userText}`
        : `${conversationHistory}\n\nUser: ${userText}`

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: fullPrompt
                  }
                ]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 300
            }
          })
        }
      )

      if (!response.ok) {
        let apiMessage = ''
        try {
          const errorData = await response.json()
          apiMessage = errorData?.error?.message || ''
        } catch {
          apiMessage = ''
        }

        if (response.status === 400) {
          throw new Error(buildApiErrorMessage(response.status, apiMessage))
        } else if (response.status === 429) {
          throw new Error(buildApiErrorMessage(response.status, apiMessage))
        } else {
          throw new Error(buildApiErrorMessage(response.status, apiMessage))
        }
      }

      const data = await response.json()

      if (!data.candidates || data.candidates.length === 0) {
        throw new Error('No response from AI. Please try again.')
      }

      const botContent = data.candidates[0].content.parts[0].text
      const corrections = parseCorrections(botContent)

      const botMsg = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: botContent,
        corrections,
        timestamp: Date.now()
      }

      setMessages(prev => [...prev, botMsg])
      setIsTyping(false)

    } catch (error) {
      console.error('API Error:', error)
      const errorMsg = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: `⚠️ ${error.message}`,
        timestamp: Date.now(),
        isError: true
      }
      setMessages(prev => [...prev, errorMsg])
      setIsTyping(false)
    }
  }

  function handleClearConversation() {
    if (window.confirm('Clear all conversation history?')) {
      setMessages([])
      localStorage.removeItem('chatbot_messages')
    }
  }

  function handleOpenSettings() {
    setShowApiKeyModal(true)
  }

  function handleSaveApiKey(key) {
    setApiKey(key)
    setShowApiKeyModal(false)
  }

  function handleSpeakMessage(messageId) {
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel()
      setSpeakingMessageId(null)
      return
    }

    const message = messages.find(m => m.id === messageId)
    if (!message) return

    const speakContent = stripCorrectionsSection(message.content)

    setSpeakingMessageId(messageId)

    const utterance = createEnglishUtterance(speakContent, 0.9)

    utterance.onend = () => {
      setSpeakingMessageId(null)
    }

    utterance.onerror = () => {
      setSpeakingMessageId(null)
    }

    window.speechSynthesis.speak(utterance)
  }

  return (
    <div className="chatbot-container">
      <div className="chat-header">
        <div className="chat-title">
          <span style={{ fontSize: '1.8rem' }}>💬</span>
          <h2>English Chat</h2>
        </div>
        <div className="chat-actions">
          <button className="chat-action-btn" onClick={handleClearConversation}>
            🗑️ Clear
          </button>
          <button className="chat-action-btn" onClick={handleOpenSettings}>
            ⚙️ Settings
          </button>
        </div>
      </div>

      <div className="chat-messages-container">
        {messages.length === 0 ? (
          <div className="chat-empty-state">
            <div className="chat-empty-icon">🤖</div>
            <div className="chat-empty-text">
              <p style={{ fontWeight: 600, fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                Start a conversation in English!
              </p>
              <p>
                Practice your English with AI. Ask questions, chat about anything,
                and get instant feedback on your grammar and spelling.
              </p>
            </div>
          </div>
        ) : (
          <>
            {messages.map(message => (
              <MessageBubble
                key={message.id}
                message={message}
                onSpeak={handleSpeakMessage}
                isSpeaking={speakingMessageId === message.id}
              />
            ))}
            {isTyping && <TypingIndicator />}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      <ChatInput
        onSendMessage={sendMessage}
        disabled={isTyping}
      />

      {showApiKeyModal && (
        <ApiKeyModal
          isOpen={showApiKeyModal}
          onSave={handleSaveApiKey}
          onCancel={() => {
            setShowApiKeyModal(false)
            if (!apiKey) {
              // If no key exists, they need one to use the chat
              alert('An API key is required to use the chatbot.')
            }
          }}
        />
      )}
    </div>
  )
}
