/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
*/

import React, { useEffect, useRef } from "react";
import {
  useGLTF,
  useAnimations,
  Image,
  Sphere,
  Cylinder,
  Circle,
  PivotControls,
} from "@react-three/drei";
import * as THREE from "three";
import { animated, easings, useSpring } from "@react-spring/three";
import { useFrame, useLoader } from "@react-three/fiber";

export default function Turntable({
  coverPicUrl,
  setHovering,
  hovering,
  focused,
  setFocused,
  playing,
  setToneArmFinished,
}) {
  const group = useRef();
  const recordRef = useRef();

  const modelLocation = "/models/turntable.glb";
  const turntable = useGLTF(modelLocation);
  const { nodes, materials, animations } = turntable;

  const { actions } = useAnimations(animations, group);
  // Animations

  const zoomConfig = {
    duration: 500,
    easing: easings.easeInOutSine,
  };

  const { rotation } = useSpring({
    rotation: !focused ? [0.5, 0.5, -0.25] : [Math.PI * 0.5, 0, 0],
    config: zoomConfig,
  });

  const { position } = useSpring({
    position: !focused ? [0, -0.24, 0] : [0, 0, 6],
    config: zoomConfig,
  });

  // Once clicked, zoom-in mode for turntable
  const { scale } = useSpring({
    scale: hovering & !focused ? 1.35 : 1.3,
    // scale: 10,
  });

  useEffect(() => {
    const toneArmAction = actions["Tone ArmAction.003"];

    toneArmAction.clampWhenFinished = true;
    toneArmAction.paused = true;
    toneArmAction.timeScale = 1;
    toneArmAction.setLoop(THREE.LoopOnce, 1);
    toneArmAction.play();
  }, []);

  useEffect(() => {
    setToneArmFinished(false);
    const toneArmAction = actions["Tone ArmAction.003"];
    if (playing) {
      toneArmAction.setEffectiveTimeScale(1);
      toneArmAction.paused = false;
      toneArmAction.clampWhenFinished = true;
    } else {
      toneArmAction.setEffectiveTimeScale(-1);
      toneArmAction.paused = false;
      toneArmAction.clampWhenFinished = true;
    }

    toneArmAction._mixer.addEventListener("finished", () => {
      setToneArmFinished(true);
    });
  }, [playing]);

  useEffect(() => {
    // document.body.style.cursor = hovering ? "pointer" : "auto"; // change pointer to finger when hovered
  }, [hovering]);

  // Event handler when hovering over Turntable
  const turntableHoverEnter = () => {
    // Set state
    setHovering(true);
  };

  const turntableHoverLeave = () => {
    setHovering(false);
  };

  const turntableClick = () => {
    setFocused(true);
  };

  const turntableMiss = () => {
    setFocused(false);
  };

  // Album Cover
  const colorMap = useLoader(THREE.TextureLoader, "/covers/" + coverPicUrl);
  colorMap.flipY = false;
  colorMap.repeat.set(1, 1);

  const albumScale = 1;
  return (
    <>
      <Circle
        ref={recordRef}
        position={[-0.331, 0.661, -0.165]}
        rotation={[Math.PI * 0.7, 0, 0]}
        args={[0.5, 100]}
      >
        <meshBasicMaterial map={colorMap} side={THREE.DoubleSide} />
      </Circle>
      <group ref={group} dispose={null} rotation={[Math.PI * 0.2, 0, 0]}>
        <group name="Scene">
          <group name="Floor_Reference" position={[0.04, 0, 0]} />
          <group
            name="Wall_Reference"
            position={[0.04, 1.64, -3.3]}
            rotation={[1.6, 0, -3.11]}
          />
          <group name="Plinth" position={[-0.62, 0, -0.86]}>
            <mesh
              name="Cube"
              castShadow
              receiveShadow
              geometry={nodes.Cube.geometry}
              material={materials.Body}
            />
            <mesh
              name="Cube_1"
              castShadow
              receiveShadow
              geometry={nodes.Cube_1.geometry}
              material={materials["Body black"]}
            />
            <mesh
              name="Cube_2"
              castShadow
              receiveShadow
              geometry={nodes.Cube_2.geometry}
              material={materials["Body- Edges"]}
            />
          </group>
          <group
            name="Case_Cover"
            position={[-0.02, 0.34, -1.66]}
            rotation={[-1.86, 0.01, -0.01]}
            scale={[1, 0.79, 1]}
          >
            <mesh
              name="Cube001"
              castShadow
              receiveShadow
              geometry={nodes.Cube001.geometry}
              material={materials.Body}
            />
            <mesh
              name="Cube001_1"
              castShadow
              receiveShadow
              geometry={nodes.Cube001_1.geometry}
              material={materials["Intter Yellow"]}
            />
            <mesh
              name="Cube001_2"
              castShadow
              receiveShadow
              geometry={nodes.Cube001_2.geometry}
              material={materials["Material.001"]}
            />
          </group>
          <mesh
            name="Record"
            castShadow
            receiveShadow
            geometry={nodes.Record.geometry}
            material={materials.Record}
            position={[-0.33, -0.7, -0.52]}
            scale={0.97}
          />
          <mesh
            name="Platter"
            castShadow
            receiveShadow
            geometry={nodes.Platter.geometry}
            material={materials.Record}
            position={[-0.33, -0.66, -0.52]}
            scale={[0.76, 0.98, 0.76]}
          />
          <mesh
            name="Center_Swivel_Album"
            castShadow
            receiveShadow
            geometry={nodes.Center_Swivel_Album.geometry}
            material={materials["Tone Arm Metal"]}
            position={[-0.33, -0.57, -0.52]}
            scale={0.97}
          />
          {/* <mesh
            ref={recordRef}
            name="Record003"
            castShadow
            receiveShadow
            geometry={nodes.Record003.geometry}
            // material={materials["Album Inner"]}
            position={[-0.33, 0.46, -0.52]}
            scale={[0.67, 0.33, 0.67]}
          >
            <meshBasicMaterial map={colorMap} side={THREE.DoubleSide} />
          </mesh> */}
          <mesh
            name="Arm_Top_Base"
            castShadow
            receiveShadow
            geometry={nodes.Arm_Top_Base.geometry}
            material={materials["Body black"]}
            position={[1.09, 0.26, -1.18]}
            scale={0.47}
          />
          <group
            name="Tone_Arm"
            position={[1.08, 0.66, -1.19]}
            rotation={[0, 0.02, 0]}
            scale={0.3}
          >
            <mesh
              name="Cylinder005"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder005.geometry}
              material={materials["Tone Arm"]}
            />
            <mesh
              name="Cylinder005_1"
              castShadow
              receiveShadow
              geometry={nodes.Cylinder005_1.geometry}
              material={materials["Tone Arm Metal"]}
            />
          </group>
        </group>
      </group>
    </>
  );
}

useGLTF.preload("/turntable.glb");
