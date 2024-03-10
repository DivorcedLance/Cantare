import { useState, useRef } from 'react';

export const AudioCustom = ({ audioFile }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [controls, setControls] = useState(false);
  
  const audioRef = useRef(null);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value;
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  const handleTimeChange = (e) => {
    const newTime = e.target.value;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  const onEnded = () => {
    setIsPlaying(false);
  };

  return (
    <div>
      <audio
        ref={ audioRef }
        controls={ controls }
        src={ audioFile }
        onTimeUpdate={handleTimeUpdate}
        onEnded={onEnded}
      />
      <button onClick={togglePlayPause}>
        {isPlaying ? 'Pause' : 'Play'}
      </button>
      {volume}
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={volume}
        onChange={handleVolumeChange}
      />
      <input type="number" 
        min="0"
        max={audioRef.current?.duration || 0}
        value={currentTime}
        onChange={handleTimeChange}
      />
      <input
        type="range"
        min="0"
        max={audioRef.current?.duration || 0}
        value={currentTime}
        onChange={handleTimeChange}
      />
    </div>
  );
};