import Head from "next/head";
import Image from "next/image";
import World from "../Components/World";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

export default function Home() {
  const created = (state) => {
    state.gl.setClearColor("crimson", 1);
  };
  return (
    <>
      {/* <Head>
        <title>ITS R3F BRUH!!</title>
        <meta name="description" content="make fckn good web experiences" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}

      <Canvas
        // orthographic
        camera={{ fov: 45, near: 0.1, far: 2000, position: [5, 8, 6] }}
        gl={{
          antialias: false,
          // toneMapping: THREE.CineonToneMapping
          // outputEncoding:THREE.sRGBEncoding //this is the default
        }}
        // onCreated={created}
      >
        <World />
      </Canvas>
    </>
  );
}
