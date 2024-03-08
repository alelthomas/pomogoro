import React, { useState, useEffect } from "react";
import fireSound from "../assets/sounds/fire.mp3";
import rainSound from "../assets/sounds/rain.wav";
import noiseSound from "../assets/sounds/fire.mp3";

function Ambience({ ambience, isPaused }) {
    const [audioSrc, setAudioSrc] = useState(null);
    const [audioRef, setAudioRef] = useState(null);
  
    useEffect(() => {
      switch (ambience) {
        case "fire":
          setAudioSrc(fireSound);
          break;
        case "rain":
          setAudioSrc(rainSound);
          break;
        case "noise":
          setAudioSrc(noiseSound);
          break;
        default:
          setAudioSrc(null);
          break;
      }
    }, [ambience]);
  
    useEffect(() => {
      if (audioRef && isPaused) {
        audioRef.pause();
      } else if (audioRef) {
        audioRef.play();
      }
    }, [isPaused]);
  
    return (
      <div>
        {audioSrc && (
          <audio src={audioSrc} autoPlay loop ref={(element) => setAudioRef(element)} />
        )}
        {!audioSrc}
      </div>
    );
  }
  
  export default Ambience;
