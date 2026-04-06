export function getBestEnglishVoice() {
  if (!window.speechSynthesis) return null
  const voices = window.speechSynthesis.getVoices()

  const priorities = [
    /en-US.*Google/i,
    /en-GB.*Google/i,
    /Microsoft.*Zira/i,
    /Microsoft.*David/i,
    /en-US.*Enhanced/i,
    /en-US.*Premium/i,
    /^en-US/i,
    /^en-GB/i,
    /^en/i
  ]

  for (const pattern of priorities) {
    const voice = voices.find(v => pattern.test(v.name) && v.lang.startsWith('en'))
    if (voice) return voice
  }

  return voices.find(v => v.lang.startsWith('en')) || voices[0]
}

export function createEnglishUtterance(text, rate = 1) {
  const utterance = new SpeechSynthesisUtterance(text)
  const voice = getBestEnglishVoice()

  if (voice) utterance.voice = voice
  utterance.lang = 'en-US'
  utterance.rate = rate
  utterance.pitch = 1
  utterance.volume = 1

  return utterance
}

export function speakEnglishText(text, rate = 1) {
  if (!window.speechSynthesis) return null

  const utterance = createEnglishUtterance(text, rate)
  window.speechSynthesis.speak(utterance)
  return utterance
}

export function setupVoiceLoading(onVoicesLoaded) {
  if (!window.speechSynthesis) return () => {}

  const synth = window.speechSynthesis
  const loadVoices = () => onVoicesLoaded?.()

  synth.getVoices()
  synth.onvoiceschanged = loadVoices

  if (synth.getVoices().length > 0) {
    loadVoices()
  }

  return () => {
    if (synth.onvoiceschanged === loadVoices) {
      synth.onvoiceschanged = null
    }
    synth.cancel()
  }
}