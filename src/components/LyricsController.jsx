import { useEffect, useState } from "react"
import { LyricsDisplay } from "./LyricsDisplay"

export function LyricsController({ lyricsSrc, currentTime }) {

  const [lyrics, setLyrics] = useState([])
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0)
  const [delay, setDelay] = useState(0)

  const parseLyric = async () => {
    const response = await fetch(lyricsSrc)
    const text = await response.text()
    const lines = text.split('\n')
    const emptyLineIndex = lines.findIndex((line) => line === '')
    lines.splice(emptyLineIndex, 1)

    const parsedLyric = lines
      .map((line) => {
        const timeStr = line.substring(1, 9)
        const time =
          parseInt(timeStr.substring(0, 2)) * 60 +
          parseFloat(timeStr.substring(3))
        const text = line.substring(10).trim()
        return { time, text }
      })
      .filter((line) => line.text !== '')

      setLyrics(parsedLyric)
  }

  useEffect(() => {
    const index = lyrics.findIndex((line) => line.time > currentTime + delay)
    setCurrentLyricIndex(index > 0 ? index - 1 : 0)
  }, [lyrics, currentTime, delay])

  useEffect (() => {
    (async () => {
      await parseLyric()
    })()
  }, [lyricsSrc])

  return (
    <>
    <h2>Delay: {delay}</h2>
    <input
        type="range"
        min="-3"
        max="3"
        step="0.001"
        value={delay}
        onChange={(e) => setDelay(parseFloat(e.target.value))}
      />
      <LyricsDisplay lyrics={lyrics} currentLyricIndex={currentLyricIndex} />
    </>
  )
}
