import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import * as THREE from "three";
import './App.css'
import react from './images/clouds.png';
// https://www.solarsystemscope.com/textures/
// https://www.pngkey.com/detail/u2w7w7t4r5e6q8y3_earth-clouds-2048-earth-clouds-texture-png/
import five from "./images/8k_earth_daymap.jpg";

const Box = (props) => {
  const mesh = useRef();
  useFrame(() => {
     mesh.current.rotation.y += 0.0008;
  });
  
  const texture = useMemo(() => new THREE.TextureLoader().load(five), []);
  
  return (
    <mesh
    {...props}
    ref={mesh}
    scale={[2, 2, 2]}
      >
      <sphereBufferGeometry color='blue' args={[1, 64, 64]}/>
      <meshBasicMaterial attach="material"  >
        <primitive attach="map" object={texture} />
      </meshBasicMaterial>
    </mesh>
  );
}

const Box2 = (props) => {
  const mesh = useRef();
  useFrame(() => {
     mesh.current.rotation.y += 0.001;
  });
  
  const texture = useMemo(() => new THREE.TextureLoader().load(react), []);
  
  return (
    <mesh
    {...props}
    ref={mesh}
    scale={[2.01, 2.01, 2.01]}
      >
      <sphereBufferGeometry transparent={true} args={[1, 64, 64]}/>
      <meshBasicMaterial attach="material" transparent={true} >
        <primitive attach="map" object={texture} transparent={true} />
      </meshBasicMaterial>
    </mesh>
  );
}

const App = () => {
  return (
    <Canvas>
      <Box position={[0, 0, 0]} />
      <Box2 position={[0, 0, 0]} />
    </Canvas>
  );
}

export default App;
