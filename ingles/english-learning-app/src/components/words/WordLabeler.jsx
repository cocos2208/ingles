import useWordLabeler from '../../hooks/useWordLabeler'

export default function WordLabeler({ wordSet, onBack }) {
  const { title, emoji, level, imageSrc, labels } = wordSet
  const {
    draggedId,
    placements,
    wrongFlash,
    overZone,
    totalPlaced,
    isComplete,
    unplacedLabels,
    setOverZone,
    handleDragStart,
    handleDragEnd,
    handleDrop,
    handleReset,
  } = useWordLabeler(labels)

  if (isComplete) {
    return (
      <div className="words-section">
        <div className="section-header">
          <h2>{emoji} {title}</h2>
        </div>
        <div className="score-screen">
          <div className="score-trophy">🏆</div>
          <h3>Perfect!</h3>
          <p className="score-result">
            You labeled all <strong>{labels.length}</strong> words correctly!
          </p>
          <div className="score-bar-wrap">
            <div className="score-bar" style={{ width: '100%' }}></div>
          </div>
          <p className="score-pct">100%</p>
          <div className="score-actions">
            <button className="next-btn" onClick={handleReset}>Try Again</button>
            <button className="back-btn-score" onClick={onBack}>← Choose Another Set</button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="words-section">
      <div className="labeler-topbar">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <div className="labeler-title">
          <span>{emoji}</span>
          <h2>{title}</h2>
          <span className={`story-level level-${level.toLowerCase()}`}>{level}</span>
        </div>
        <span className="labeler-progress">{totalPlaced}/{labels.length}</span>
      </div>

      <div className="reader-hint">
        <span className="hint-dot"></span>
        Drag each word to its correct place on the image.
      </div>

      <div className="image-labeler">
        {imageSrc ? (
          <img src={imageSrc} alt={title} className="labeler-image" draggable={false} />
        ) : (
          <div className="image-placeholder-box">
            <span style={{ fontSize: '4rem' }}>{emoji}</span>
            <p>Add your image to <code>public/images/</code></p>
            <p>and set <code>imageSrc</code> in <code>words.js</code></p>
          </div>
        )}

        {labels.map(label => {
          const isPlaced = Boolean(placements[label.id])
          const isFlashing = wrongFlash === label.id
          const isOver = overZone === label.id

          let zoneClass = 'drop-zone'
          if (isPlaced) zoneClass += ' correct'
          else if (isFlashing) zoneClass += ' wrong-flash'
          else if (isOver) zoneClass += ' over'

          return (
            <div
              key={label.id}
              className={zoneClass}
              style={{ left: `${label.x}%`, top: `${label.y}%` }}
              onDragOver={e => { e.preventDefault(); if (!isPlaced) setOverZone(label.id) }}
              onDragLeave={() => setOverZone(null)}
              onDrop={() => handleDrop(label.id)}
            >
              {isPlaced ? (
                <span className="zone-label-correct">{label.word}</span>
              ) : (
                <span className="zone-dot"></span>
              )}
            </div>
          )
        })}
      </div>

      <div className="word-bank">
        <p className="word-bank-title">Word Bank</p>
        <div className="word-bank-chips">
          {unplacedLabels.map(label => (
            <div
              key={label.id}
              className={`word-chip ${draggedId === label.id ? 'dragging' : ''}`}
              draggable
              onDragStart={() => handleDragStart(label.id)}
              onDragEnd={handleDragEnd}
            >
              {label.word}
            </div>
          ))}
          {unplacedLabels.length === 0 && totalPlaced < labels.length && (
            <p className="word-bank-empty">All words placed!</p>
          )}
        </div>
      </div>
    </div>
  )
}
