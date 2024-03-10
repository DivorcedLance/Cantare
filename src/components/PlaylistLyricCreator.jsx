import { useState } from 'react';
import { LyricsCreator } from './LyricsCreator';

export const PlaylistLyricsCreator = ({ songs }) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

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
    <div style={{ padding: "20px" }}>
      <LyricsCreator
          autoPlay={true}
          audioSrc={songs[currentSongIndex].audioFile}
          playNextSong={playNextSong}
          playPreviousSong={playPreviousSong}
          metaData={songs[currentSongIndex].metaData}
        />
      </div>
  );
};
