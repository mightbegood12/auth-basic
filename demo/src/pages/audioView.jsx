import WaveSurfer from "wavesurfer.js";
import { useEffect, useRef, useState } from "react";

const AudioView = () => {
  const waveformRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  let wavesurfer;

  useEffect(() => {
    wavesurfer = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#34374B",
      progressColor: "#F90",
      url: "/sample_audio.wav",
      dragToSeek: true,
      width: "24vw",
      height: "12vh",
      hideScrollbar: true,
      normalize: true,
      barGap: 1,
      height: 60,
      barHeight: 20,
      barRadius: 20,
      barWidth: 5,
    });

    wavesurfer.on("finish", () => {
      console.log("song finished");
    });

    wavesurfer.on("ready", () => {
      console.log("Waveform is ready");
    });
    return () => {
      wavesurfer.destroy();
    };
  }, []);

  const handleStop = () => {
    if (wavesurfer) {
      wavesurfer.stop();
    }
  };
  const handlePause = () => {
    console.log("Container ref:", wavesurfer);

    if (wavesurfer) {
      wavesurfer.playPause();
      // setIsPlaying(!isPlaying);
    }
  };

  const handleSkipForward = () => {
    if (wavesurfer) {
      wavesurfer.skip(1);
    }
  };
  const handleSkipBack = () => {
    if (wavesurfer) {
      wavesurfer.skip(-1);
    }
  };
  return (
    <div className="container">
      <div className="sub-container">
        <p>Audio</p>
        <div ref={waveformRef} className="wavesurfer-container" />
        <div className="wavesurfer-controls">
          <button onClick={handleSkipBack}>Backward</button>
          <button onClick={handlePause}>{isPlaying ? "Pause" : "Play"}</button>
          <button onClick={handleStop}>Stop</button>
          <button onClick={handleSkipForward}>Forward</button>
        </div>
      </div>
    </div>
  );
};

export default AudioView;
