import { config } from "@react-spring/three";
import Button from "./Button";

/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React from "react";

export default function MenuButtons({
  playing,
  setPlaying,
  soundOn,
  setSoundOn,
  songIndex,
  setSongIndex,
  seeMenu,
  setSeeMenu,
  position,
  rotation,
}) {
  const springConfig = config.bouncy;

  // Additional unclick handler for play button
  const playUnclickHandler = ({ setPlaying, playing }) => {
    setPlaying(!playing);
    console.log("setting play option");
  };

  return (
    <group position={position} rotation={rotation}>
      <Button
        id="headphonesButton"
        scaleNormal={0.65}
        scalePressed={0.6}
        hoveringScale={0.7}
        springConfig={springConfig}
        switchButton={soundOn}
        setSwitchButton={setSoundOn}
        modelPath1={"/models/buttons/headphones_button.glb"}
        modelPath2={"/models/buttons/headphones_button.glb"}
        position={[2, -1, 4]}
        rotation={[0.5, 0.5, -0.25]}
        additionalUnclickHandler={() => {
          setSeeMenu(false);
        }}
      />
    </group>
  );
}
