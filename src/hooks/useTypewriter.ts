import { useEffect, useState } from 'react'

/**
 * Rotates through a list of words with a typewriter effect.
 * @param words words to cycle through
 * @param typeMs typing speed per character
 * @param deleteMs deletion speed per character
 * @param holdMs pause while word is fully typed
 */
export function useTypewriter(
  words: readonly string[],
  typeMs = 90,
  deleteMs = 45,
  holdMs = 1800,
) {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[index % words.length]
    let timeout: ReturnType<typeof setTimeout>

    if (!deleting && text === word) {
      timeout = setTimeout(() => setDeleting(true), holdMs)
    } else if (deleting && text === '') {
      setDeleting(false)
      setIndex((i) => (i + 1) % words.length)
    } else {
      timeout = setTimeout(
        () => {
          setText(word.slice(0, text.length + (deleting ? -1 : 1)))
        },
        deleting ? deleteMs : typeMs,
      )
    }
    return () => clearTimeout(timeout)
  }, [text, deleting, index, words, typeMs, deleteMs, holdMs])

  return text
}
