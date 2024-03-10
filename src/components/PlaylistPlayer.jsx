import '../App.css'

import { useRef, useState } from 'react'
import { AudioDisplay } from './AudioDisplay'
import { LyricsController } from './LyricsController'
import { Icon } from './Icon'
import shuffleIcon from '../assets/shuffle.svg'
import listIcon from '../assets/list.svg'

export const PlaylistPlayer = ({ songs }) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [playlist, setPlaylist] = useState(songs)
  const [showPlaylistMenu, setShowPlaylistMenu] = useState(false)

  const scrollContainerRef = useRef(null)

  const handleSongEnd = () => {
    playNextSong()
  }

  const shufflePlaylist = () => {
    const newPlaylist = [...playlist]
    for (let i = newPlaylist.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[newPlaylist[i], newPlaylist[j]] = [newPlaylist[j], newPlaylist[i]]
    }
    setPlaylist(newPlaylist)
  }

  const playNextSong = () => {
    if (currentSongIndex < playlist.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1)
    } else {
      setCurrentSongIndex(0)
    }
  }

  const playPreviousSong = () => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1)
    } else {
      setCurrentSongIndex(playlist.length - 1)
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
      <div
        style={{ position: 'absolute', zIndex: 1, top: '10px', left: '10px' }}
      >
        <Icon
          src={listIcon}
          onClick={() => setShowPlaylistMenu(!showPlaylistMenu)}
        />
      </div>
      <div
        className="playlist-menu"
        style={{
          position: 'absolute',
          boxSizing: 'border-box',
          top: '80px',
          left: '10px',
          display: `${showPlaylistMenu ? 'flex' : 'none'}`,
        }}
      >
        <ul className='no-scrollbar'>
          {playlist.map((song, index) => (
            <li
              key={index}
              onClick={() => {
                setCurrentSongIndex(index)
                setShowPlaylistMenu(false)
              }}
              style={{
                fontWeight: `${
                  index === currentSongIndex ? 'bold' : 'normal'
                }`,
                cursor: 'pointer',
                backgroundColor: `${
                  index === currentSongIndex ? 'beige' : '#1a1a1a'
                }`,
                color: `${
                  index === currentSongIndex ? 'black' : 'white'
                }`,
              }}
            >
              {song.metaData.artist} - {song.metaData.title}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ position: 'absolute', top: '10px', right: '65px' }}>
        <Icon src={shuffleIcon} onClick={shufflePlaylist} />
      </div>
      <div
        ref={scrollContainerRef}
        className="hidden-scrollbar"
        style={{ flex: '1', overflowY: 'auto' }}
      >
        <LyricsController
          lyricsSrc={playlist[currentSongIndex].lyricFile}
          currentTime={currentTime}
          scrollContainerRef={scrollContainerRef}
        />
      </div>
      <div>
        <AudioDisplay
          autoPlay={true}
          audioSrc={playlist[currentSongIndex].audioFile}
          onUpdateCurrentTime={setCurrentTime}
          onSongEnd={handleSongEnd}
          playNextSong={playNextSong}
          playPreviousSong={playPreviousSong}
          metaData={playlist[currentSongIndex].metaData}
        ></AudioDisplay>
      </div>
    </div>
  )
}
