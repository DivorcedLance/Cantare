import '../App.css'

import { useState, useRef } from 'react'

import prevIcon from '../assets/prev.svg'
import playIcon from '../assets/play.svg'
import pauseIcon from '../assets/pause.svg'
import volumeIcon from '../assets/volume.svg'
import muteIcon from '../assets/mute.svg'
import { Icon } from './Icon'

export function AudioDisplay({
  audioSrc,
  onUpdateCurrentTime,
  onSongEnd,
  autoPlay,
  playNextSong,
  playPreviousSong,
  metaData,
}) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(1)
  const [currentTime, setCurrentTime] = useState(0)
  const [controls, setControls] = useState(false)
  const [muted, setMuted] = useState(false)

  const audioRef = useRef(null)

  const getTimeStr = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    const minutesStr = minutes < 10 ? `0${minutes}` : minutes
    const secondsStr = seconds < 10 ? `0${seconds}` : seconds
    return `${minutesStr}:${secondsStr}`
  }

  const togglePlayPause = () => {
    const audio = audioRef.current
    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value
    audioRef.current.volume = newVolume
    setVolume(newVolume)
  }

  const handleTimeChange = (e) => {
    const newTime = e.target.value
    audioRef.current.currentTime = newTime
    setCurrentTime(newTime)
  }

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime)
    onUpdateCurrentTime(audioRef.current.currentTime)
  }

  const onEnded = () => {
    onSongEnd()
  }

  return (
    <>
      <audio
        ref={audioRef}
        controls={controls}
        src={audioSrc}
        onTimeUpdate={handleTimeUpdate}
        onEnded={onEnded}
        autoPlay={autoPlay}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        muted={muted}
      />
      <hr style={{ accentColor: 'fff', width: '100%' }} />
      <div className="audio-display">

        <div className='meta-data'>
          <div className="album-cover">
            {metaData.cover ? (
              <img src={metaData.cover} style={{ width: '100px' }} />
            ) : (
              <div style={{ width: '100px' }}></div>
            )}
          </div>

          <div className="song-info">
            <p className="title">{metaData.title}</p>
            <p className="artist">{metaData.artist}</p>
          </div>
        </div>

        <div
          className="control-btns"
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon src={prevIcon} onClick={playPreviousSong} />
          <Icon
            src={isPlaying ? pauseIcon : playIcon}
            onClick={togglePlayPause}
          />
          <Icon rotate={true} src={prevIcon} onClick={playNextSong} />
        </div>

        <div className="play-bar">
          <div className="timeStamp">{getTimeStr(currentTime)}</div>
          <input
            className="custom-slider audio-slider"
            type="range"
            min="0"
            max={audioRef.current?.duration || 0}
            value={currentTime}
            onChange={handleTimeChange}
          />
          <div className="timeStamp">
            {getTimeStr(audioRef.current?.duration || 0)}
          </div>
        </div>

        <div className="volume-bar">
          <Icon
            src={muted ? muteIcon : volumeIcon}
            onClick={() => {
              setMuted(!muted)
            }}
          />
          <input
            className="custom-slider"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>
      </div>
    </>
  )
}
