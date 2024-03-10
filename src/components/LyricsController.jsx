import { useEffect, useState } from 'react'
import { LyricsDisplay } from './LyricsDisplay'
import { Icon } from './Icon'

import configIcon from '../assets/config.svg'

export function LyricsController({
  lyricsSrc,
  currentTime,
  scrollContainerRef,
}) {
  const [lyrics, setLyrics] = useState([])
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0)
  const [delay, setDelay] = useState(0)
  const [isConfigOpen, setIsConfigOpen] = useState(false)
  const [autoScroll, setAutoScroll] = useState(true)

  const parseLyric = async () => {
    const response = await fetch(lyricsSrc)
    const text = await response.text()
    const lines = text.split('\n')
    const emptyLineIndex = lines
      .map((line) => line.trim())
      .findIndex((line) => line === '')
    lines.splice(emptyLineIndex, 1)

    let parsedLyric
    if (lines[0].substring(0, 1) === '[' && !(isNaN(lines[0].substring(1, 2))) && lines.length > 0) {
      parsedLyric = lines
      .map((line) => {
        const timeStr = line.substring(1, 9)
        const time =
          parseInt(timeStr.substring(0, 2)) * 60 +
          parseFloat(timeStr.substring(3))
        const text = line.substring(10).trim()
        return { time, text }
      })
      .filter((line) => line.text !== '')
    } else {
      parsedLyric = lines
        .map((line) => {
          return { time: 0, text: line }
        })
        .filter((line) => line.text !== '')
    }

    setLyrics(parsedLyric)
  }

  useEffect(() => {
    const index = lyrics.findIndex((line) => line.time > currentTime + delay)
    setCurrentLyricIndex(index > 0 ? index - 1 : 0)
  }, [lyrics, currentTime, delay])

  useEffect(() => {
    (async () => {
      await parseLyric()
    })()
  }, [lyricsSrc])

  return (
    <div>
      <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
        <Icon
          src={configIcon}
          onClick={() => {
            setIsConfigOpen(!isConfigOpen)
          }}
        />
        {isConfigOpen ? (
          <div style={{ position: 'absolute', top: '60px', right: '0', fontWeight: "bold", fontSize: "1.2rem", width: "200px", display: "flex", flexDirection: "column", paddingRight: "20px", gap: "5px" }}>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
              <label>Delay: </label>
              <input
                style={{ width: "50px" }}
                type="text"
                min="-15"
                max="15"
                value={delay}
                onChange={(e) => {
                  setDelay(parseFloat(e.target.value))
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
              <input type="checkbox" checked={autoScroll} onChange={() => setAutoScroll(!autoScroll)} />
              <label>Auto Scroll</label>
            </div>
          </div>
        ) : null}
      </div>
      <LyricsDisplay
        lyrics={lyrics}
        currentLyricIndex={currentLyricIndex}
        scrollContainerRef={scrollContainerRef}
        autoScroll={autoScroll}
      />
    </div>
  )
}
