import "./App.css";

import { PlaylistPlayer } from './components/PlaylistPlayer';
import { PlaylistLyricsCreator } from './components/PlaylistLyricCreator';

import songs from './data/songs.json';

function App() {

  const shuffle = (array) => { 
    for (let i = array.length - 1; i > 0; i--) { 
      const j = Math.floor(Math.random() * (i + 1)); 
      [array[i], array[j]] = [array[j], array[i]]; 
    } 
    return array; 
  }; 

  const shuffledSongs = shuffle(songs);

  return (
    <PlaylistPlayer songs={shuffledSongs} />
    // <PlaylistLyricsCreator songs={shuffledSongs} />
  );
}

export default App;
