import { LyricPlayer } from './components/LyricPlayer2';
import audioFile from './assets/10 - Carpet Crawlers.mp3';
import lyricFile from './assets/10 - Carpet Crawlers.lrc';

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1>Cantare</h1>
      <LyricPlayer audioSrc={audioFile} lyricSrc={lyricFile} />
    </div>
  );
}

export default App;
