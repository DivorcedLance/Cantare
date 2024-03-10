import { useState } from 'react';
import { LyricsCreator } from './LyricsCreator';

export const PlaylistLyricsCreator = ({ songs }) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [playing, setPlaying] = useState(false);

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
        <button onClick={() => {setPlaying(!playing)}}> {playing ? "Pause" : "Play"}  </button>
        <button onClick={playNextSong}>Next</button>
      </div>

      <LyricsCreator
          playing={playing}
          setPlaying={setPlaying}
          autoPlay={true}
          audioSrc={songs[currentSongIndex].audioFile}
        />
      </>
  );
};
