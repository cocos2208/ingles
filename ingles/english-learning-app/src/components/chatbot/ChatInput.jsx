import { useState, useEffect, useRef } from 'react'

export default function ChatInput({ onSendMessage, disabled }) {
  const [inputText, setInputText] = useState('')
  const [validationMessage, setValidationMessage] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [recognition, setRecognition] = useState(null)
  const [recognitionSupported, setRecognitionSupported] = useState(true)
  const textareaRef = useRef(null)

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      console.warn('Speech Recognition not supported')
      setRecognitionSupported(false)
      return
    }

    const rec = new SpeechRecognition()
    rec.continuous = false
    rec.interimResults = false
    rec.lang = 'en-US'
    rec.maxAlternatives = 1

    rec.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      setInputText(transcript)
      setIsListening(false)
      // Auto-send after voice input
      setTimeout(() => {
        handleSend(transcript)
      }, 100)
    }

    rec.onerror = (event) => {
      console.error('Speech recognition error:', event.error)
      setIsListening(false)

      if (event.error === 'not-allowed') {
        alert('Microphone access denied. Please enable it in browser settings.')
      } else if (event.error === 'no-speech') {
        alert('No speech detected. Please try again.')
      } else {
        alert(`Voice recognition error: ${event.error}`)
      }
    }

    rec.onend = () => {
      setIsListening(false)
    }

    setRecognition(rec)
  }, [])

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = '44px'
      const scrollHeight = textareaRef.current.scrollHeight
      textareaRef.current.style.height = Math.min(scrollHeight, 120) + 'px'
    }
  }, [inputText])

  function handleSend(text = inputText) {
    const trimmed = text.trim()

    if (disabled) {
      setValidationMessage('Please wait for the current response before sending another message.')
      return
    }

    if (!trimmed) {
      setValidationMessage('Please type a message before sending.')
      return
    }

    if (trimmed.length < 2) {
      setValidationMessage('Message is too short. Please add a bit more detail.')
      return
    }

    onSendMessage(trimmed)
    setInputText('')
    setValidationMessage('')

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = '44px'
    }
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  function toggleVoiceInput() {
    if (!recognition) {
      alert('Speech recognition not supported in this browser. Use Chrome or Edge for voice input.')
      return
    }

    if (isListening) {
      recognition.stop()
    } else {
      try {
        recognition.start()
        setIsListening(true)
      } catch (error) {
        console.error('Failed to start recognition:', error)
        alert('Could not start voice recognition. Please try again.')
      }
    }
  }

  return (
    <div className="chat-input-container">
      <textarea
        ref={textareaRef}
        className="chat-textarea"
        value={inputText}
        onChange={(e) => {
          setInputText(e.target.value)
          if (validationMessage) {
            setValidationMessage('')
          }
        }}
        onKeyPress={handleKeyPress}
        placeholder="Type your message or click the microphone..."
        disabled={disabled || isListening}
        rows={1}
      />

      {validationMessage && (
        <p style={{ color: 'var(--wrong)', fontSize: '0.84rem', margin: '0.45rem 0 0' }}>
          {validationMessage}
        </p>
      )}

      <div className="chat-input-btns">
        <button
          className={`chat-mic-btn ${isListening ? 'listening' : ''}`}
          onClick={toggleVoiceInput}
          disabled={disabled}
          title={recognitionSupported ? 'Voice input' : 'Voice input not supported'}
        >
          {isListening ? '🔴' : '🎤'}
        </button>

        <button
          className="chat-send-btn"
          onClick={() => handleSend()}
          disabled={disabled || !inputText.trim()}
          title="Send message"
        >
          ➤
        </button>
      </div>
    </div>
  )
}
