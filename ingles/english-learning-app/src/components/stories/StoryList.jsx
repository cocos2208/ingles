export default function StoryList({ stories, onSelect }) {
  return (
    <div className="story-list">
      <div className="section-header">
        <h2>Choose a Story</h2>
        <p className="section-subtitle">Click on a story to start reading. Then click on any highlighted word to see its meaning in Spanish.</p>
      </div>
      <div className="story-grid">
        {stories.map(story => (
          <button key={story.id} className="story-card" onClick={() => onSelect(story)}>
            <div className="story-card-banner">
              <span className="story-emoji">{story.emoji}</span>
            </div>
            <div className="story-card-body">
              <h3 className="story-title">{story.title}</h3>
              <span className={`story-level level-${story.level.toLowerCase()}`}>{story.level}</span>
              <span className="story-vocab">{Object.keys(story.vocabulary).length} vocabulary words</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
