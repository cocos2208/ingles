export default function WordSetList({ wordSets, onSelect }) {
  return (
    <div className="words-section">
      <div className="section-header">
        <h2>Word Pictures</h2>
        <p className="section-subtitle">
          Choose an image and drag the English words to the right spot.
        </p>
      </div>
      <div className="story-grid">
        {wordSets.map(set => (
          <button key={set.id} className="story-card" onClick={() => onSelect(set)}>
            <div className="story-card-banner">
              <span className="story-emoji">{set.emoji}</span>
            </div>
            <div className="story-card-body">
              <span className="story-title">{set.title}</span>
              <span className={`story-level level-${set.level.toLowerCase()}`}>
                {set.level}
              </span>
              <span className="story-vocab">{set.labels.length} words</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
