import { useRef, useState, useEffect } from 'react'

export function LyricPlayer({ audioSrc, lyricSrc }) {
  const audioRef = useRef(null)
  const lyricRef = useRef([])

  const [playTime, setPlayTime] = useState('00:00')
  const [lyric, setLyric] = useState([])
  const [currentLyric, setCurrentLyric] = useState('')

  const parseLyric = async () => {
    const response = await fetch(lyricSrc)
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

    setLyric(parsedLyric)
    lyricRef.current = parsedLyric
  }

  const updateLyric = () => {
    const audio = audioRef.current
    const currentTime = audio.currentTime
    const currentLyricObj = lyricRef.current.reduce((prev, curr) => {
      return curr.time <= currentTime && (!prev || curr.time > prev.time)
        ? curr
        : prev
    }, null)

    setCurrentLyric(currentLyricObj ? currentLyricObj.text : '')
  }

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

  useEffect(() => {
    (async () => {
      await parseLyric()
      const audio = audioRef.current
      audio.addEventListener('timeupdate', () => {
        const time = audio.currentTime
        const timeStr = getTimeStr(time)
        setPlayTime(timeStr)
        updateLyric()
      })
    })()
  }, [lyricSrc])

  return (
    <div>
      <audio controls ref={audioRef} src={audioSrc}></audio>
      <div>
        <span>{playTime}</span>
        <p>{currentLyric}</p>
      </div>
    </div>
  )
}
