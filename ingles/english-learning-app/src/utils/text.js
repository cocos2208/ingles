const CORRECTIONS_MARKER = '✏️ Corrections:'

export function stripCorrectionsSection(text) {
  if (typeof text !== 'string') return ''
  if (!text.includes(CORRECTIONS_MARKER)) return text
  return text.split(CORRECTIONS_MARKER)[0].trim()
}