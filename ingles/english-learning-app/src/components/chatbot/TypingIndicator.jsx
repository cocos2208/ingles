export default function TypingIndicator() {
  return (
    <div className="typing-indicator">
      <div className="message-avatar bot-avatar">
        🤖
      </div>
      <div className="typing-bubble">
        <span className="typing-text">AI is typing</span>
        <div className="typing-dots">
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
          <div className="typing-dot"></div>
        </div>
      </div>
    </div>
  )
}
