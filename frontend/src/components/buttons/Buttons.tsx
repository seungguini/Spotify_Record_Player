import { config } from "@react-spring/three";
import Button from "./Button";

/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React from "react";
import { useGLTF } from "@react-three/drei";
import { useIsPlaying } from "../../states";
import { usePlaybackActions } from "../../states";

useGLTF.preload("/prev_button.glb");

interface ButtonsProps {
  playing: boolean,
  setPlaying: () => void,
  soundOn: boolean,
  setLol: () => void
}

interface UnclickType {
  [key: string]: (first: boolean) => void | boolean
}

export default function Buttons({ playing, setPlaying, soundOn, setLol } : ButtonsProps) {
  const scaleNormal = 0.03;
  const scalePressed = 0.025;
  const hoveringScale = 0.032;
  const springConfig = config.gentle;

  // States + actions from the playbackStore
  const isPlaying = useIsPlaying();
  const { play, pause, } = usePlaybackActions();

  // Additional unclick handler for play button
  const playClickHandler = () => {
    if (isPlaying) {
      pause()
      console.log("setting Zustand pause")
    } else {
      play()
      console.log("setting Zustand play")
    }
  };

  // Additional unclick handler for sound button
  const soundClickHandler = ({ setLol, soundOn } : UnclickType) => {
    // setLol(!soundOn);
    console.log("setting sound option");
  };

  return (
    <>
      {/* <Button
        id="soundOnOffButton"
        scaleNormal={scaleNormal}
        scalePressed={scalePressed}
        hoveringScale={hoveringScale}
        springConfig={springConfig}
        switchButton={true}
        modelPathOne={"/models/buttons/soundon_button.glb"}
        modelPathTwo={"/models/buttons/soundoff_button.glb"}
        position={[2, -1, 4]}
        rotation={[0.5, 0.5, -0.25]}
        actionHandler={soundClickHandler}
      /> */}
      <Button
        id="playPauseButton"
        scaleNormal={scaleNormal}
        scalePressed={scalePressed}
        hoveringScale={hoveringScale}
        springConfig={springConfig}
        switchButton={true}
        modelPathOne={"/models/buttons/play_button.glb"}
        modelPathTwo={"/models/buttons/pause_button.glb"}
        position={[0, -1, 4]}
        rotation={[0.5, 0.5, -0.25]}
        actionHandler={playClickHandler}
        
      />

      {/* <Button
        id="nextButton"
        scaleNormal={scaleNormal}
        scalePressed={scalePressed}
        hoveringScale={hoveringScale}
        springConfig={springConfig}
        switchButton={true}
        modelPathOne={"/models/buttons/next_button.glb"}
        modelPathTwo={"/models/buttons/next_button.glb"}
        position={[1, -1, 4]}
        rotation={[0.5, 0.5, -0.25]}
        
      />
      <Button
        id="prevButton"
        scaleNormal={scaleNormal}
        scalePressed={scalePressed}
        hoveringScale={hoveringScale}
        springConfig={springConfig}
        switchButton={true}
        modelPathOne={"/models/buttons/prev_button.glb"}
        modelPathTwo={"/models/buttons/prev_button.glb"}
        position={[-1, -1, 4]}
        rotation={[0.5, 0.5, -0.25]}
        
      /> */}
      <Button
        id="homeButton"
        scaleNormal={0.8}
        scalePressed={0.7}
        hoveringScale={0.9}
        springConfig={springConfig}
        switchButton={true}
        modelPathOne={"/models/buttons/home_button.glb"}
        modelPathTwo={"/models/buttons/home_button.glb"}
        position={[-1.85, -0.65, 4.5]}
        rotation={[Math.PI * 0.12, Math.PI * 0.16, -Math.PI * 0.08]}
        actionHandler={
          () => {
            window.open("https://github.com/seungguini/vintage_turntable");
          }
        }
        
      />
    </>
  );
}
