export const matchesLanguage = (
  text: string,
  langCode: string,
  threshold: number = 0.7,
): boolean => {
  if (!text || !langCode) return false

  const cleanText = text.replace(/[\s\d.,!?;:()\[\]{}'"]/g, '')
  if (cleanText.length === 0) return false

  // Language-specific regex patterns
  const languagePatterns: Record<string, RegExp> = {
    en: /^[a-zA-Z]+$/, // English (Latin alphabet)
    th: /^[\u0E00-\u0E7F]+$/, // Thai
    jp: /^[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]+$/, // Japanese (Hiragana, Katakana, Kanji)
    cn: /^[\u4E00-\u9FFF]+$/, // Chinese
    kr: /^[\uAC00-\uD7A3\u1100-\u11FF]+$/, // Korean
    ru: /^[\u0400-\u04FF]+$/, // Russian (Cyrillic)
    ar: /^[\u0600-\u06FF]+$/, // Arabic
    hi: /^[\u0900-\u097F]+$/, // Hindi (Devanagari)
  }

  const pattern = languagePatterns[langCode.toLowerCase()]
  if (!pattern) {
    console.warn(`No pattern defined for language code: ${langCode}`)
    return false
  }

  let matchCount = 0
  for (const char of cleanText) {
    if (pattern.test(char)) {
      matchCount++
    }
  }

  const matchPercentage = matchCount / cleanText.length

  return matchPercentage >= threshold
}
