import { useState } from 'react'
import { LyricsController } from './LyricsController'
import { AudioDisplay } from './AudioDisplay'

export function LyricPlayer({ audioSrc, lyricSrc }) {

  const [currentTime, setCurrentTime] = useState(0)

  return (
    <div>
      <AudioDisplay audioSrc={audioSrc} onUpdateCurrentTime={setCurrentTime} />
      <LyricsController lyricsSrc={lyricSrc} currentTime={currentTime}/>
    </div>
  )
}
