import { useState } from 'react'

export default function useQuoteQuiz(quotes) {
  const [current, setCurrent] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [wasCorrect, setWasCorrect] = useState(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const total = quotes.length
  const quote = quotes[current]
  const progressPercent = total > 0 ? (current / total) * 100 : 0

  function handleAnswer(correct) {
    if (answered || finished) return

    setAnswered(true)
    setWasCorrect(correct)
    if (correct) setScore((prev) => prev + 1)
  }

  function handleNext() {
    if (current + 1 >= total) {
      setFinished(true)
      return
    }

    setCurrent((prev) => prev + 1)
    setAnswered(false)
    setWasCorrect(null)
  }

  function handleRestart() {
    setCurrent(0)
    setAnswered(false)
    setWasCorrect(null)
    setScore(0)
    setFinished(false)
  }

  return {
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
  }
}
