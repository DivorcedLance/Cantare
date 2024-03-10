import { PlaylistPlayer } from './components/PlaylistPlayer';
import { PlaylistLyricsCreator } from './components/PlaylistLyricCreator';
import { AudioCustom } from './components/AudioCustom';

import songs from './data/songs.json';

import e1 from "/songs/07 - The Fountain Of Salmacis (Digital Remastered 2008).mp3"
import e2 from "/songs/09 - Brain Damage.mp3"

function App() {

 const editSongs = [
    {
      audioFile: e1,
      metaData: {
        title: "The Fountain Of Salmacis",
        artist: "Genesis",
        album: "Nursery Cryme",
        year: "1971"
      }
    },
    {
      audioFile: e2,
      metaData: {
        title: "Brain Damage",
        artist: "Pink Floyd",
        album: "The Dark Side of the Moon",
        year: "1973"
      }
    }
  ]

  return (
    <PlaylistPlayer songs={songs} />
    // <PlaylistLyricsCreator songs={editSongs} />
    // <AudioCustom audioSrc={"/songs/06 - The Knife (Remastered 2008).mp3"} />
  );
}

export default App;
