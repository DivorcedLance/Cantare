import "./App.css";

import { PlaylistPlayer } from './components/PlaylistPlayer';

import songs from './data/songs.json';

function App() {

  const sortByTitle = (a, b) => {
    if (a.metaData.title < b.metaData.title) {
      return -1;
    }
    if (a.metaData.title > b.metaData.title) {
      return 1;
    }
    return 0;
  };

  const sortByArtist = (a, b) => {
    if (a.metaData.artist < b.metaData.artist) {
      return -1;
    }
    if (a.metaData.artist > b.metaData.artist) {
      return 1;
    }
    return 0;
  }
  
  const sortByArtistThenTitle = (a, b) => {
    const artistSort = sortByArtist(a, b);
    if (artistSort === 0) {
      return sortByTitle(a, b);
    }
    return artistSort;
  }
  
  const sortedList = songs.sort(sortByArtistThenTitle);

  return (
    <PlaylistPlayer songs={sortedList} />
  );
}

export default App;
