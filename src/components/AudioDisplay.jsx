import { useEffect, useRef, useState } from 'react'

export function AudioDisplay({
  audioSrc,
  onUpdateCurrentTime,
  onSongEnd,
  autoPlay,
  playing,
  setPlaying,
}) {
  const audioRef = useRef(null)

  const [displayPlayTime, setDisplayPlayTime] = useState('00:00')

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
    const onTimeUpdate = (e) => {
      const currentTime = e.target.currentTime
      setDisplayPlayTime(getTimeStr(currentTime))
      onUpdateCurrentTime(currentTime)
    }

    const audio = audioRef.current
    audio.addEventListener('timeupdate', onTimeUpdate)
    audio.addEventListener('ended', onSongEnd)
    audio.addEventListener('play', () => setPlaying(true))
    audio.addEventListener('pause', () => setPlaying(false))

    return () => {
      audio.removeEventListener('timeupdate', onTimeUpdate)
      audio.removeEventListener('ended', onSongEnd)
    }
  }, [onUpdateCurrentTime, onSongEnd, setPlaying, audioRef])

  useEffect(() => {
    const audio = audioRef.current
    if (playing) {
      audio.play()
    } else {
      audio.pause()
    }
  }, [playing, audioRef])

  return (
    <div>
      <audio autoPlay={autoPlay} controls ref={audioRef} src={audioSrc}></audio>
      <h3>{displayPlayTime}</h3>
    </div>
  )
}
