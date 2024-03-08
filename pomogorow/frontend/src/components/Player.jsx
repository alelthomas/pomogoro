import React, { useRef } from 'react';
import selectSound from '../assets/sounds/select.wav';

function SoundPlayer() {
  const audioRef = useRef(null);

  const playSound = () => {
    audioRef.current.play();
  };

  return (
    <audio ref={audioRef} src={selectSound} />
  );
}

export default SoundPlayer;