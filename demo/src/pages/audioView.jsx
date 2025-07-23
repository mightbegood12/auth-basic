import WaveSurfer from "wavesurfer.js";
import { useEffect, useRef, useState } from "react";
import SyncLoader from "react-spinners/SyncLoader";

const AudioView = () => {
  const waveformRef = useRef(null);
  const wavesurferRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentSong, setCurrentSong] = useState("/sample_audio.wav");
  const songs = [
    {
      name: "Sample Audio",
      src: "/sample_audio.wav",
    },
    {
      name: "Interstellar",
      src: "/interstellar.mp3",
    },
  ];

  useEffect(() => {
    wavesurferRef.current = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#004574ff",
      progressColor: "#F90",
      url: currentSong,
      dragToSeek: true,
      width: "35vw",
      hideScrollbar: true,
      normalize: true,
      barGap: 1,
      height: 60,
      barHeight: 20,
      barRadius: 20,
      barWidth: 2,
    });

    wavesurferRef.current.on("finish", () => {
      console.log("song finished");
    });

    wavesurferRef.current.on("ready", () => {
      setIsLoading(false);
    });
    return () => {
      wavesurferRef.current.destroy();
    };
  }, [currentSong]);

  const handleSongChange = (e) => {
    setIsLoading(true);
    setIsPlaying(false);
    setCurrentSong(e.target.value);
  };

  const handleStop = () => {
    if (wavesurferRef.current) {
      wavesurferRef.current.stop();
    }
  };
  const handlePause = () => {
    if (wavesurferRef) {
      wavesurferRef.current.playPause();
      setIsPlaying((prev) => !prev);
    }
    // console.log("Container ref:", wavesurferRef);
  };

  const handleSkipForward = () => {
    if (wavesurferRef) {
      wavesurferRef.current?.skip(1);
    }
  };
  const handleSkipBack = () => {
    if (wavesurferRef) {
      wavesurferRef.current?.skip(-1);
    }
  };
  return (
    <div className="container">
      <div className="sub-container">
        <p>Audio</p>
        <div ref={waveformRef} className="wavesurfer-container" />
        {isLoading && <SyncLoader color="#110e99ff" />}
        <div className="wavesurfer-controls">
          <button onClick={handleSkipBack}>Backward</button>
          <button onClick={handlePause}>{isPlaying ? "Pause" : "Play"}</button>
          <button onClick={handleStop}>Stop</button>
          <button onClick={handleSkipForward}>Forward</button>
        </div>
        <select className="song-select" onChange={handleSongChange}>
          {songs.map((song, index) => (
            <option key={index} value={song.src}>
              {song.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default AudioView;
