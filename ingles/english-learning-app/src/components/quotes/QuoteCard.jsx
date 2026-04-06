import { quotes } from '../../data/quotes'
import QuizOptions from './QuizOptions'
import useQuoteQuiz from '../../hooks/useQuoteQuiz'

export default function QuoteCard() {
  const {
    current,
    answered,
    wasCorrect,
    score,
    finished,
    total,
    quote,
    progressPercent,
    handleAnswer,
    handleNext,
    handleRestart,
  } = useQuoteQuiz(quotes)

  if (finished) {
    const pct = Math.round((score / total) * 100)
    return (
      <div className="quotes-section">
        <div className="section-header">
          <h2>Movie Quotes Quiz</h2>
        </div>
        <div className="score-screen">
          <div className="score-trophy">{pct >= 75 ? '🏆' : pct >= 50 ? '🥈' : '📚'}</div>
          <h3>Quiz Complete!</h3>
          <p className="score-result">You got <strong>{score}</strong> out of <strong>{total}</strong> correct</p>
          <div className="score-bar-wrap">
            <div className="score-bar" style={{ width: `${pct}%` }}></div>
          </div>
          <p className="score-pct">{pct}%</p>
          <button className="next-btn" onClick={handleRestart}>Try Again</button>
        </div>
      </div>
    )
  }

  return (
    <div className="quotes-section">
      <div className="section-header">
        <h2>Movie Quotes Quiz</h2>
        <p className="section-subtitle">Watch the clip, then choose what the quote means in Spanish.</p>
      </div>
      <div className="progress-bar-wrap">
        <div className="progress-bar" style={{ width: `${progressPercent}%` }}></div>
      </div>
      <p className="progress-text">{current + 1} / {total} quotes</p>
      <div className="quote-card">
        <div className="quote-card-header">
          <div className="quote-movie">
            <span className="movie-icon">🎬</span>
            {quote.movie} <span className="movie-year">({quote.year})</span>
          </div>
        </div>
        {quote.videoSrc ? (
          <div className="video-wrapper">
            <video
              key={quote.id}
              controls
              className="quote-video"
              preload="metadata"
            >
              <source src={quote.videoSrc} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ) : (
          <div className="video-placeholder">
            <span className="video-placeholder-icon">🎥</span>
            <p>No video yet for this quote</p>
          </div>
        )}
        <blockquote className="quote-text">"{quote.quote}"</blockquote>
      </div>
      <p className="quiz-question">What does this quote mean?</p>
      <QuizOptions
        options={quote.options}
        onAnswer={handleAnswer}
        answered={answered}
      />
      {answered && (
        <div className={`feedback-banner ${wasCorrect ? 'feedback-correct' : 'feedback-wrong'}`}>
          {wasCorrect
            ? '✓ Correct! Well done.'
            : `✗ Not quite. The correct answer is highlighted above.`}
        </div>
      )}
      {answered && (
        <button className="next-btn" onClick={handleNext}>
          {current + 1 >= total ? 'See Results' : 'Next Quote →'}
        </button>
      )}
    </div>
  )
}
