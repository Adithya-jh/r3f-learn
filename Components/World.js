import { useFrame, extend, useThree } from "@react-three/fiber";
import { React, useRef } from "react";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { meshReflectorMaterial } from "@react-three/drei";
import { useLoader } from "@react-three/fiber";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

import Drunk from "../CustomEffects/Drunk";

import {
  Noise,
  Glitch,
  Vignette,
  EffectComposer,
  Bloom,
  DepthOfField,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

import Fox from "../Components/Fox";

import {
  OrbitControls,
  TransformControls,
  PivotControls,
  Html,
} from "@react-three/drei";
// extend({ OrbitControls: OrbitControls });
import * as THREE from "three";

import CustomObject from "../Components/CustomObject";

function World() {
  const hamburger = useLoader(GLTFLoader, "./hamburger.glb", (loader) => {
    console.log(loader);

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath("./draco/");
    loader.setDRACOLoader(dracoLoader);
  });

  console.log(hamburger);

  const { camera, gl } = useThree();
  const sphereRef = useRef();
  const groupRef = useRef();
  const groupRef2 = useRef();
  const torusRef = useRef();
  const DrunkRef = useRef();

  useFrame((state, delta) => {
    const angle = state.clock.elapsedTime;
    // state.camera.position.x = Math.sin(angle);
    // state.camera.position.z = Math.cos(angle);
    // state.camera.lookAt(0, 0, 0);
    // state.camera.position.z = Math.cos(angle);
    // sphereRef.current.rotation.x += delta;
    groupRef.current.rotation.y += delta;
    groupRef2.current.rotation.y += delta;
    // state.camera.position.x += delta;
  });

  const eventHandler = (state) => {
    console.log("Hello");
    torusRef.current.material.color.set(`hsl(${Math.random() * 360},100%,75%)`);
  };

  return (
    <>
      {/* <OrbitControls args={[camera, gl.domElement]} /> */}

      <EffectComposer multisampling={0}>
        {/* <Vignette
          offset={0.3}
          darkness={0.9}
          BlendFunction={BlendFunction.NORMAL}
        /> */}
        {/* <Glitch /> */}
        {/* <Noise premultiply BlendFunction={BlendFunction.OVERLAY} /> */}
        {/* <Bloom mipmapBlur /> */}
        {/* <DepthOfField /> */}
        <Drunk frequency={10} amplitude={0.1} ref={DrunkRef} />
      </EffectComposer>

      <OrbitControls
      // target={[0, 1, 0]}
      // minDistance={1}
      // maxDistance={200}
      // minPolarAngle={0.2}
      // maxPolarAngle={Math.PI / 2.1}
      // enablePan={false}
      />
      <directionalLight position={[1, 2, 3]} intensity={1.5} />
      <ambientLight />

      <group ref={groupRef}>
        {/* <mesh ref={sphereRef} position-x={-1}>
          <sphereGeometry args={[2, 5, 5]} />
          <meshStandardMaterial color="orangered" />
        </mesh> */}

        <mesh position={(7, -10, 0)} rotation-x={-Math.PI * 0.5} scale={10}>
          <planeGeometry />
          <meshStandardMaterial color="greenyellow" side={THREE.DoubleSide} />
          {/* <meshReflectorMaterial /> */}
        </mesh>
        {/* 
          <mesh position={(15, -2, -10)} rotation-x={-Math.PI * 0.5} scale={10}>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" side={THREE.DoubleSide} /> */}
        {/* <meshReflectorMaterial /> */}
        {/* </mesh> */}

        {/* <mesh>
          <torusKnotGeometry />
          <meshBasicMaterial color="orange" />
        </mesh> */}
      </group>

      <group ref={groupRef2} position={(0, 20, 0)}>
        <mesh position={(2, -2, 0)} rotation-x={-Math.PI * 0.5} scale={5}>
          <planeGeometry />
          <meshStandardMaterial color="skyblue" side={THREE.DoubleSide} />
        </mesh>

        <mesh position={(3, -2, 0)} rotation-x={-Math.PI * 0.5} scale={5}>
          <torusBufferGeometry />
          <meshStandardMaterial
            color="orangered"
            side={THREE.DoubleSide}
            // toneMapped={false}
          />
        </mesh>

        <mesh
          position={(5, -2, 0)}
          rotation-x={-Math.PI * 0.5}
          scale={5}
          // onClick={eventHandler}
          ref={torusRef}
          onPointerEnter={() => {
            document.body.style.cursor = "pointer";
          }}
          onPointerLeave={() => {
            document.body.style.cursor = "default";
          }}
        >
          <torusKnotBufferGeometry />
          <meshStandardMaterial
            // color={[1.5, 1, 4]}
            color="mediumpurple"
            side={THREE.DoubleSide}
            // toneMapped={false}
          />
        </mesh>
      </group>

      <Html wrapperClass="label">R3F BRUH! </Html>

      <CustomObject />

      {/* <primitive object={hamburger.scene} position={(50, -2, 0)} /> */}
      {/* <Fox /> */}
    </>
  );
}

export default World;
