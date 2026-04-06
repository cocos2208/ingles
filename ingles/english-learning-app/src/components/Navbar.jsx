export default function Navbar({ activeTab, setActiveTab }) {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <span className="brand-icon">📚</span>
        <span className="brand-name">English Learning</span>
      </div>
      <div className="navbar-tabs">
        <button
          className={`tab-btn ${activeTab === 'stories' ? 'active' : ''}`}
          onClick={() => setActiveTab('stories')}
        >
          <span className="tab-icon">📖</span>
          Stories
        </button>
        <button
          className={`tab-btn ${activeTab === 'quotes' ? 'active' : ''}`}
          onClick={() => setActiveTab('quotes')}
        >
          <span className="tab-icon">🎬</span>
          Movie Quotes
        </button>
        <button
          className={`tab-btn ${activeTab === 'words' ? 'active' : ''}`}
          onClick={() => setActiveTab('words')}
        >
          <span className="tab-icon">🔤</span>
          Words
        </button>
        <button
          className={`tab-btn ${activeTab === 'chat' ? 'active' : ''}`}
          onClick={() => setActiveTab('chat')}
        >
          <span className="tab-icon">💬</span>
          Chat
        </button>
      </div>
    </nav>
  )
}
