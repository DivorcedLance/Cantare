import { useState } from 'react'
import { LyricsController } from './LyricsController'
import { AudioDisplay } from './AudioDisplay'

export function LyricsPlayer({
  audioSrc,
  lyricSrc,
  onSongEnd,
  autoPlay,
  playing,
  setPlaying,
}) {
  const [currentTime, setCurrentTime] = useState(0)

  return (
    <div>
      <AudioDisplay
        audioSrc={audioSrc}
        onUpdateCurrentTime={setCurrentTime}
        onSongEnd={onSongEnd}
        autoPlay={autoPlay}
        playing={playing}
        setPlaying={setPlaying}
      />
      <LyricsController lyricsSrc={lyricSrc} currentTime={currentTime} />
    </div>
  )
}
