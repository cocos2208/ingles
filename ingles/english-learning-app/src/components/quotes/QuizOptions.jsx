import { useState } from 'react'

export default function QuizOptions({ options, onAnswer, answered }) {
  const [selected, setSelected] = useState(null)

  function handleSelect(option, index) {
    if (answered) return
    setSelected(index)
    onAnswer(option.correct)
  }

  function getButtonClass(option, index) {
    let cls = 'option-btn'
    if (!answered) return cls
    if (option.correct) return cls + ' correct'
    if (selected === index && !option.correct) return cls + ' wrong'
    return cls + ' dimmed'
  }

  return (
    <div className="quiz-options">
      {options.map((option, i) => (
        <button
          key={i}
          className={getButtonClass(option, i)}
          onClick={() => handleSelect(option, i)}
          disabled={answered}
        >
          <span className="option-letter">{String.fromCharCode(65 + i)}</span>
          <span className="option-text">{option.text}</span>
          {answered && option.correct && <span className="option-icon">✓</span>}
          {answered && selected === i && !option.correct && <span className="option-icon">✗</span>}
        </button>
      ))}
    </div>
  )
}
