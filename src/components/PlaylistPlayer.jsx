import { useState } from 'react';
import { LyricsPlayer } from './LyricsPlayer';

export const PlaylistPlayer = ({ songs }) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const handleSongEnd = () => {
    playNextSong();
  };

  const playNextSong = () => {
    if (currentSongIndex < songs.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    } else {  
      setCurrentSongIndex(0);
    }
  }

  const playPreviousSong = () => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1);
    } else {
      setCurrentSongIndex(songs.length - 1);
    }
  }

  return (
    <>
      <div>
        <h2>{songs[currentSongIndex].metaData.title}</h2>
        <h3>{songs[currentSongIndex].metaData.artist}</h3>
        <h3>{songs[currentSongIndex].metaData.album}</h3>
        <h3>{songs[currentSongIndex].metaData.year}</h3>
        
        <button onClick={playPreviousSong}>Previous</button>
        <button onClick={playNextSong}>Next</button>
      </div>

      <LyricsPlayer
        autoPlay={true}
        audioSrc={songs[currentSongIndex].audioFile}
        lyricSrc={songs[currentSongIndex].lyricFile}
        onSongEnd={handleSongEnd}
        />
      </>
  );
};
