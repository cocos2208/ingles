import { useState, useCallback, useEffect } from 'react'
import WordPopup from './WordPopup'
import { createEnglishUtterance, getBestEnglishVoice, setupVoiceLoading, speakEnglishText } from '../../utils/speech'

function cleanWord(word) {
  return word.replace(/[^a-zA-Z'-]/g, '').toLowerCase()
}

export default function StoryReader({ story, onBack }) {
  const [popup, setPopup] = useState(null)
  const [isReading, setIsReading] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [readSpeed, setReadSpeed] = useState(0.9)
  const [voicesLoaded, setVoicesLoaded] = useState(false)

  useEffect(() => {
    return setupVoiceLoading(() => setVoicesLoaded(true))
  }, [])

  const handleWordClick = useCallback((e, rawWord) => {
    const clean = cleanWord(rawWord)
    const translation = story.vocabulary[clean]
    if (!translation) return

    // Pronunciar la palabra en inglés con la voz mejorada
    speakEnglishText(clean, 1.0)

    // Mostrar popup de traducción
    const rect = e.target.getBoundingClientRect()
    const scrollTop = window.scrollY || document.documentElement.scrollTop
    setPopup({
      word: clean,
      translation,
      position: {
        x: Math.min(rect.left, window.innerWidth - 220),
        y: rect.bottom + scrollTop + 8,
      }
    })
    e.stopPropagation()
  }, [story.vocabulary])

  function handleReadStory() {
    if (!window.speechSynthesis) {
      alert('Your browser does not support text-to-speech.')
      return
    }

    if (isReading && !isPaused) {
      window.speechSynthesis.pause()
      setIsPaused(true)
    } else if (isPaused) {
      window.speechSynthesis.resume()
      setIsPaused(false)
    } else {
      window.speechSynthesis.cancel()

      const utterance = createEnglishUtterance(story.content, readSpeed)

      utterance.onstart = () => {
        setIsReading(true)
        setIsPaused(false)
      }

      utterance.onend = () => {
        setIsReading(false)
        setIsPaused(false)
      }

      utterance.onerror = () => {
        setIsReading(false)
        setIsPaused(false)
      }

      window.speechSynthesis.speak(utterance)
    }
  }

  function handleStopReading() {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel()
      setIsReading(false)
      setIsPaused(false)
    }
  }

  const words = story.content.split(/(\s+)/)
  const selectedVoice = voicesLoaded ? getBestEnglishVoice() : null

  return (
    <div className="story-reader">
      <button className="back-btn" onClick={onBack}>
        ← Back to Stories
      </button>
      <div className="reader-header">
        <span className="story-emoji-large">{story.emoji}</span>
        <h2>{story.title}</h2>
        <span className={`story-level level-${story.level.toLowerCase()}`}>{story.level}</span>
      </div>

      <div className="voice-controls">
        <button
          className={`voice-btn ${isReading && !isPaused ? 'voice-btn-active' : ''}`}
          onClick={handleReadStory}
          disabled={!voicesLoaded}
        >
          <span className="voice-icon">
            {!isReading ? '🔊' : isPaused ? '▶️' : '⏸'}
          </span>
          {!isReading ? 'Read Story Aloud' : isPaused ? 'Resume' : 'Pause'}
        </button>
        {isReading && (
          <button className="voice-btn voice-btn-stop" onClick={handleStopReading}>
            <span className="voice-icon">⏹</span>
            Stop
          </button>
        )}
        <div className="voice-speed-control">
          <label htmlFor="speed-slider" className="speed-label">
            Speed: {readSpeed.toFixed(1)}x
          </label>
          <input
            id="speed-slider"
            type="range"
            min="0.5"
            max="1.5"
            step="0.1"
            value={readSpeed}
            onChange={(e) => setReadSpeed(parseFloat(e.target.value))}
            className="speed-slider"
            disabled={isReading && !isPaused}
          />
        </div>
      </div>

      {selectedVoice && (
        <div className="voice-info">
          <span className="voice-info-icon">🎙️</span>
          Using voice: <strong>{selectedVoice.name}</strong>
        </div>
      )}

      <div className="reader-hint">
        <span className="hint-dot"></span>
        Click any word to hear it pronounced and see the meaning in Spanish.
      </div>
      <div className="story-text">
        {words.map((segment, i) => {
          if (/^\s+$/.test(segment)) {
            return <span key={i}>{segment}</span>
          }
          const clean = cleanWord(segment)
          const hasTranslation = Boolean(story.vocabulary[clean])
          return (
            <span
              key={i}
              className={hasTranslation ? 'word clickable-word' : 'word'}
              onClick={hasTranslation ? (e) => handleWordClick(e, segment) : undefined}
            >
              {segment}
            </span>
          )
        })}
      </div>
      {popup && (
        <WordPopup
          word={popup.word}
          translation={popup.translation}
          position={popup.position}
          onClose={() => setPopup(null)}
        />
      )}
    </div>
  )
}
