import { useEffect, useRef, useState } from 'react'
import { AudioDisplay } from './AudioDisplay'
import { LyricsDisplay } from './LyricsDisplay'

export function LyricsCreator({
  audioSrc,
  autoPlay,
  playNextSong,
  playPreviousSong,
  metaData,
}) {
  const inputTextAreaRef = useRef(null)
  const resultTextAreaRef = useRef(null)

  const [lyrics, setLyrics] = useState([])
  const [lyricsTextResult, setLyricsTextResult] = useState('')
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0)
  const [currentEditingLyricIndex, setCurrentEditingLyricIndex] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)

  const getTimeStr = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    const secondDecimals = Math.floor((time - Math.floor(time)) * 100)
    const minutesStr = minutes < 10 ? `0${minutes}` : minutes
    const secondsStr = seconds < 10 ? `0${seconds}` : seconds
    const secondDecimalsStr =
      secondDecimals < 10 ? `0${secondDecimals}` : secondDecimals
    return `${minutesStr}:${secondsStr}.${secondDecimalsStr}`
  }

  const parseText = () => {
    if (inputTextAreaRef.current.style.display !== 'none') {
      const text = inputTextAreaRef.current.value
      const lines = text.split('\n')
      // Clean white spaces and empty lines
      const lyrics = lines
        .map((line) => line.trim())
        .filter((line) => line.length > 0)
        .map((line) => {
          return { time: 0, text: line }
        })
      setLyrics(lyrics)
      setCurrentLyricIndex(0)
      setCurrentEditingLyricIndex(0)
      inputTextAreaRef.current.style.display = 'none'
    } else {
      inputTextAreaRef.current.style.display = 'block'
    }
  }

  const setTimeStamp = () => {
    const newLyrics = lyrics.map((lyric, index) => {
      if (index === currentEditingLyricIndex) {
        return { ...lyric, time: currentTime }
      }
      return lyric
    })
    setLyrics(newLyrics)
    if (currentEditingLyricIndex != 0) {
      setCurrentLyricIndex(currentLyricIndex + 1)
    }
    setCurrentEditingLyricIndex(currentEditingLyricIndex + 1)
  }

  useEffect(() => {
    const result = lyrics.map((lyric) => {
      return lyric.time
        ? `[${getTimeStr(lyric.time)}]${lyric.text}`
        : lyric.text
    })
    setLyricsTextResult(result.join('\n'))
  }, [lyrics])

  return (
    <div>
      <AudioDisplay
        audioSrc={audioSrc}
        onUpdateCurrentTime={setCurrentTime}
        onSongEnd={() => {}}
        autoPlay={autoPlay}
        playNextSong={playNextSong}
        playPreviousSong={playPreviousSong}
        metaData={metaData}
      />
      <div style={{ display: 'flex', flexDirection: 'column', maxWidth: '900px', margin: "0 auto" }}>
        <textarea ref={inputTextAreaRef} rows="25" cols="1" />
        <button onClick={parseText}>Parse</button>
        <button onClick={setTimeStamp}>Set TimeStamp</button>
        <h3>{currentLyricIndex}</h3>
        <h3>{currentEditingLyricIndex}</h3>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <LyricsDisplay lyrics={lyrics} currentLyricIndex={currentLyricIndex} autoScroll={false}/>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <textarea
            ref={resultTextAreaRef}
            value={lyricsTextResult}
            rows="25"
            cols="100"
          ></textarea>
          <button
            onClick={() => {
              navigator.clipboard.writeText(resultTextAreaRef.current.value)
            }}
          >
            Copy to ClipBoard
          </button>
        </div>
      </div>
    </div>
  )
}
