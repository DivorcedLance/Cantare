import { useState } from 'react'
import { LyricsController } from './LyricsController'
import { AudioCustom } from './AudioCustom'

export function LyricsPlayer({
  audioSrc,
  lyricSrc,
  onSongEnd,
  autoPlay,
}) {
  const [currentTime, setCurrentTime] = useState(0)

  return (
    <div>
      <AudioCustom
        audioSrc={audioSrc}
        onUpdateCurrentTime={setCurrentTime}
        onSongEnd={onSongEnd}
        autoPlay={autoPlay}
      />
      <LyricsController lyricsSrc={lyricSrc} currentTime={currentTime} />
    </div>
  )
}
