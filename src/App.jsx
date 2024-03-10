import audioFile from './assets/10 - Carpet Crawlers.mp3';
import lyricFile from './assets/10 - Carpet Crawlers.lrc';

import { LyricPlayer } from './components/LyricPlayer';

function App() {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <LyricPlayer audioSrc={audioFile} lyricSrc={lyricFile} />
    </div>
  );
}

export default App;
