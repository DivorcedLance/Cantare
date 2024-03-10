import { PlaylistPlayer } from './components/PlaylistPlayer';
import { PlaylistLyricsCreator } from './components/PlaylistLyricCreator';
import { AudioCustom } from './components/AudioCustom';

import s1 from "./assets/06 - Supper's Ready (Digital Remastered 2008).mp3"
import s2 from "./assets/06 - The Knife (Remastered 2008).mp3"
import s3 from "./assets/10 - Carpet Crawlers.mp3"

import l1 from "./assets/06 - Supper's Ready (Digital Remastered 2008).lrc"
import l2 from "./assets/06 - The Knife (Remastered 2008).lrc"
import l3 from "./assets/10 - Carpet Crawlers.lrc"

import e1 from "./assets/07 - The Fountain Of Salmacis (Digital Remastered 2008).mp3"
import e2 from "./assets/09 - Brain Damage.mp3"

function App() {
  
  const songs = [
    {
      audioFile: s1,
      lyricFile: l1,
      metaData: {
        title: "Supper's Ready",
        artist: "Genesis",
        album: "Foxtrot",
        year: "1972"
      }
    },
    {
      audioFile: s2,
      lyricFile: l2,
      metaData: {
        title: "The Knife",
        artist: "Genesis",
        album: "Trespass",
        year: "1970"
      }
    },
    {
      audioFile: s3,
      lyricFile: l3,
      metaData: {
        title: "Carpet Crawlers",
        artist: "Genesis",
        album: "The Lamb Lies Down on Broadway",
        year: "1974"
      }
    }
  ]

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
    // <PlaylistPlayer songs={songs} />
    // <PlaylistLyricsCreator songs={editSongs} />
    <AudioCustom audioFile={s3} />
  );
}

export default App;
