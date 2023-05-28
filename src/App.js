import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import * as THREE from "three";
import "./App.css";
import react from "./images/clouds.png";
// https://www.solarsystemscope.com/textures/
// https://www.pngkey.com/detail/u2w7w7t4r5e6q8y3_earth-clouds-2048-earth-clouds-texture-png/
import TwoKEarth from "./images/2k_earth_daymap.webp";
import FourKEarth from "./images/4k_earth_daymap.webp";
import moon720p from "./images/720p_moon.webp";
import moon360p from "./images/360p_moon.webp";

const App = () => {
  const [earthTextureToUse, setEarthTextureToUse] = React.useState(FourKEarth);
  const [moonTextureToUse, setMoonTextureToUse] = React.useState(moon720p);
  const [earthTrisAmount, setEarthTrisAmount] = React.useState(64);
  const [moonTrisAmount, setMoonTrisAmount] = React.useState(32);

  const handleSetEarthTexture = () => {
    if (earthTextureToUse === TwoKEarth) {
      setEarthTextureToUse(FourKEarth);
    } else {
      setEarthTextureToUse(TwoKEarth);
    }
  };

  const handleSetMoonTexture = () => {
    if (earthTextureToUse === moon360p) {
      setMoonTextureToUse(moon720p);
    } else {
      setMoonTextureToUse(moon360p);
    }
  };

  const handleSetEarthTris = () => {
    if (earthTrisAmount === 64) {
      setEarthTrisAmount(32);
    } else {
      setEarthTrisAmount(64);
    }
  };

  const handleSetMoonTris = () => {
    if (moonTrisAmount === 32) {
      setMoonTrisAmount(16);
    } else {
      setMoonTrisAmount(32);
    }
  };

  const toggleGraphics = () => {
    handleSetEarthTexture();
    handleSetMoonTexture();
    handleSetEarthTris();
    handleSetMoonTris();
  };

  const Earth = (props) => {
    const mesh = useRef();
    useFrame(() => {
      mesh.current.rotation.y += 0.0008;
    });

    const texture = useMemo(
      () => new THREE.TextureLoader().load(earthTextureToUse),
      []
    );

    return (
      <mesh {...props} ref={mesh} scale={[2, 2, 2]}>
        <sphereBufferGeometry
          color="blue"
          args={[1, earthTrisAmount, earthTrisAmount]}
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
          args={[1, earthTrisAmount, earthTrisAmount]}
        />
        <meshBasicMaterial attach="material" transparent={true}>
          <primitive attach="map" object={texture}  />
        </meshBasicMaterial>
      </mesh>
    );
  };

  const Moon = (props) => {
    let angle = 0;
    
    let radius = 5;
    const mesh = useRef();
    useFrame(() => {
      mesh.current.rotation.y -= 0.001;
      angle += Math.acos(1-Math.pow(0.01/radius,2)/2);
      mesh.current.position.z = radius * Math.cos(angle);
      mesh.current.position.x = radius * Math.sin(angle);
    });

    const texture = useMemo(() => new THREE.TextureLoader().load(moonTextureToUse), []);

    return (
      <mesh {...props} ref={mesh} scale={[0.4, 0.4, 0.4]}>
        <sphereBufferGeometry
          transparent={true}
          args={[1, moonTrisAmount, moonTrisAmount]}
        />
        <meshStandardMaterial attach="material">
          <primitive attach="map" object={texture}  />
          </meshStandardMaterial>
      </mesh>
    );
  }

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
    <Canvas camera={{position: [0,0,8.5], fov: 40}}>
   
      <Earth position={[0, -0.1, 0]} />
      <Clouds position={[0, -0.1, 0]} />
      <Moon position={[3,0,2]} />
      <SettingsButton position={[-1.75, 2.5, 0]} onClick={toggleGraphics} />
      <ambientLight intensity={0.1} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-5, 5, 1]} intensity={0.2} angle={0} penumbra={0}/>
   
    </Canvas>
  );
};

export default App;
