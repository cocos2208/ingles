import { useEffect, useRef } from 'react'

export default function WordPopup({ word, translation, position, onClose }) {
  const popupRef = useRef(null)

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose()
    }
    function handleClickOutside(e) {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [onClose])

  if (!word) return null

  return (
    <div
      ref={popupRef}
      className="word-popup"
      style={{ top: position.y, left: position.x }}
    >
      <button className="popup-close" onClick={onClose}>×</button>
      <div className="popup-content">
        <p className="popup-english">{word}</p>
        <div className="popup-arrow">↓</div>
        <p className="popup-spanish">{translation}</p>
      </div>
    </div>
  )
}
