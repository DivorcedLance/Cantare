import "../App.css"

import { useRef, useState } from 'react'
import { LyricsPlayer } from './LyricsPlayer'
import { AudioDisplay } from './AudioDisplay'
import { LyricsController } from './LyricsController'

export const PlaylistPlayer = ({ songs }) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const scrollContainerRef = useRef(null)

  const handleSongEnd = () => {
    playNextSong()
  }

  const playNextSong = () => {
    if (currentSongIndex < songs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1)
    } else {
      setCurrentSongIndex(0)
    }
  }

  const playPreviousSong = () => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1)
    } else {
      setCurrentSongIndex(songs.length - 1)
    }
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        boxSizing: 'border-box',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div ref={scrollContainerRef} className='hidden-scrollbar' style={{ flex: "1",  overflowY: "auto"}}>
        <LyricsController
          lyricsSrc={songs[currentSongIndex].lyricFile}
          currentTime={currentTime}
          scrollContainerRef={scrollContainerRef}
          />
      </div>
      <div>
        <AudioDisplay
          autoPlay={true}
          audioSrc={songs[currentSongIndex].audioFile}
          onUpdateCurrentTime={setCurrentTime}
          onSongEnd={handleSongEnd}
          playNextSong={playNextSong}
          playPreviousSong={playPreviousSong}
          metaData={songs[currentSongIndex].metaData}
          >
        </AudioDisplay>
      </div>
    </div>
  )
}
