import { stripCorrectionsSection } from '../../utils/text'

export default function MessageBubble({ message, onSpeak, isSpeaking }) {
  const isUser = message.role === 'user'
  const isError = message.isError

  function getRelativeTime(timestamp) {
    const now = Date.now()
    const diff = now - timestamp
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)

    if (minutes < 1) return 'just now'
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    return new Date(timestamp).toLocaleDateString()
  }

  function handleCopy() {
    navigator.clipboard.writeText(message.content)
  }

  // Remove correction markers from display
  const displayContent = isUser ? message.content : stripCorrectionsSection(message.content)

  return (
    <div className={`message-bubble ${isUser ? 'user-message' : ''}`}>
      <div className={`message-avatar ${isUser ? 'user-avatar' : 'bot-avatar'}`}>
        {isUser ? '👤' : '🤖'}
      </div>

      <div className="message-content-wrapper">
        <div className={`message-content ${isError ? 'error-message' : ''}`}>
          {displayContent}
        </div>

        {message.corrections && message.corrections.length > 0 && (
          <div className="message-corrections">
            <span className="corrections-title">✏️ Corrections:</span>
            {message.corrections.map((correction, idx) => (
              <div key={idx} className="correction-item">
                • <span className="correction-original">"{correction.original}"</span>
                <span className="correction-arrow">→</span>
                <span className="correction-fixed">"{correction.corrected}"</span>
                {correction.explanation && (
                  <span className="correction-explanation">
                    ({correction.explanation})
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="message-timestamp">
          {getRelativeTime(message.timestamp)}
        </div>

        {!isError && (
          <div className="message-actions">
            <button
              className={`message-action-btn ${isSpeaking ? 'speaking' : ''}`}
              onClick={() => onSpeak(message.id)}
            >
              🔊 {isSpeaking ? 'Speaking...' : 'Speak'}
            </button>
            <button className="message-action-btn" onClick={handleCopy}>
              📋 Copy
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
