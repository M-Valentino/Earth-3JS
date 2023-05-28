import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import * as THREE from "three";
import "./App.css";
import react from "./images/clouds.png";
// https://www.solarsystemscope.com/textures/
// https://www.pngkey.com/detail/u2w7w7t4r5e6q8y3_earth-clouds-2048-earth-clouds-texture-png/
import TwoKEarth from "./images/2k_earth_daymap.webp";
import FourKEarth from "./images/4k_earth_daymap.webp";

const App = () => {
  const [textureToUse, setTextureToUse] = React.useState(FourKEarth);
  const [sphereTrisAmount, setSphereTrisAmount] = React.useState(64);

  const handleSetTexture = () => {
    if (textureToUse === TwoKEarth) {
      setTextureToUse(FourKEarth);
    } else {
      setTextureToUse(TwoKEarth);
    }
  };

  const handleSetSphereTris = () => {
    if (sphereTrisAmount === 64) {
      setSphereTrisAmount(32);
    } else {
      setSphereTrisAmount(64);
    }
  };

  const toggleGraphics = () => {
    handleSetSphereTris();
    handleSetTexture();
  };

  const Earth = (props) => {
    const mesh = useRef();
    useFrame(() => {
      mesh.current.rotation.y += 0.0008;
    });

    const texture = useMemo(
      () => new THREE.TextureLoader().load(textureToUse),
      []
    );

    return (
      <mesh {...props} ref={mesh} scale={[2, 2, 2]}>
        <sphereBufferGeometry
          color="blue"
          args={[1, sphereTrisAmount, sphereTrisAmount]}
        />
        <meshStandardMaterial attach="material">
          <primitive attach="map" object={texture} />
        </meshStandardMaterial>
      </mesh>
    );
  };

  const Clouds = (props) => {
    const mesh = useRef();
    useFrame(() => {
      mesh.current.rotation.y += 0.001;
    });

    const texture = useMemo(() => new THREE.TextureLoader().load(react), []);

    return (
      <mesh {...props} ref={mesh} scale={[2.01, 2.01, 2.01]}>
        <sphereBufferGeometry
          transparent={true}
          args={[1, sphereTrisAmount, sphereTrisAmount]}
        />
        <meshBasicMaterial attach="material" transparent={true}>
          <primitive attach="map" object={texture}  />
        </meshBasicMaterial>
      </mesh>
    );
  };

  const SettingsButton = (props) => {
    const [hovered, setHovered] = useState(false);

    useEffect(() => {
      document.body.style.cursor = hovered ? "pointer" : "auto";
    }, [hovered]);
    const mesh = useRef();
    useFrame(() => {
      mesh.current.rotation.x = Math.sin(Date.now() * 0.001) * Math.PI * 0.01;
      mesh.current.rotation.y = Math.sin(Date.now() * 0.001) * Math.PI * 0.004;
      mesh.current.rotation.z = Math.sin(Date.now() * 0.001) * Math.PI * 0.015;
    });
    return (
      <mesh
        {...props}
        ref={mesh}
        scale={[1, 1, 1]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >

        <boxBufferGeometry args={[1.2, 0.5, 0.05]} />
        <meshStandardMaterial color='white'/>
      </mesh>
    );
  };

  return (
    <Canvas>
      <Earth position={[0, 0, 0]} />
      <Clouds position={[0, 0, 0]} />
      <SettingsButton position={[-1.75, 3.2, 0]} onClick={toggleGraphics} />
      <ambientLight intensity={0.1} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-1.65, 7.2, 1]} angle={0.5} penumbra={0.5}/>
    </Canvas>
  );
};

export default App;
