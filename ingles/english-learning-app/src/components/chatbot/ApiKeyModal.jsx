import { useState } from 'react'

export default function ApiKeyModal({ isOpen, onSave, onCancel }) {
  const [apiKey, setApiKey] = useState('')
  const [showKey, setShowKey] = useState(false)
  const [error, setError] = useState('')

  if (!isOpen) return null

  function handleSave() {
    // Basic validation
    if (!apiKey.trim()) {
      setError('Please enter an API key')
      return
    }

    if (!apiKey.startsWith('AIza')) {
      setError('Invalid API key format. Google Gemini keys start with "AIza"')
      return
    }

    // Save to localStorage
    localStorage.setItem('chatbot_api_key', apiKey.trim())
    onSave(apiKey.trim())
    setApiKey('')
    setError('')
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      handleSave()
    }
  }

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-icon">🔑</span>
          <h3>Google Gemini API Key Required</h3>
        </div>

        <div className="modal-body">
          <p className="modal-text">
            To use the chatbot, you need a Google Gemini API key. This is <strong>completely FREE</strong> with
            generous limits (1,500 requests/day). The key stays on your device.
          </p>
          <p className="modal-text">
            Get your FREE API key at{' '}
            <a
              href="https://aistudio.google.com/app/apikey"
              target="_blank"
              rel="noopener noreferrer"
              className="modal-link"
            >
              aistudio.google.com/app/apikey
            </a>
          </p>

          <div className="modal-input-group">
            <label htmlFor="api-key-input" className="modal-label">
              API Key
            </label>
            <div className="modal-input-wrapper">
              <input
                id="api-key-input"
                type={showKey ? 'text' : 'password'}
                value={apiKey}
                onChange={(e) => {
                  setApiKey(e.target.value)
                  setError('')
                }}
                onKeyPress={handleKeyPress}
                placeholder="AIza..."
                className="modal-input"
                autoFocus
              />
              <button
                className="modal-toggle-visibility"
                onClick={() => setShowKey(!showKey)}
                type="button"
              >
                {showKey ? '🙈' : '👁'}
              </button>
            </div>
            {error && (
              <p style={{ color: 'var(--wrong)', fontSize: '0.85rem', margin: '0.3rem 0 0' }}>
                {error}
              </p>
            )}
          </div>
        </div>

        <div className="modal-actions">
          <button className="modal-btn modal-btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button className="modal-btn modal-btn-primary" onClick={handleSave}>
            Save Key
          </button>
        </div>
      </div>
    </div>
  )
}
