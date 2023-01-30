import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect } from "react";
import React from "react";

function Fox() {
  const fox = useGLTF("./Fox/glTF/Fox.gltf");
  const animations = useAnimations(fox.animations, fox.scene);

  useEffect(() => {
    const action = animations.actions.Run;
    action.play();

    window.setTimeout(() => {
      animations.actions.Walk.play();

      animations.actions.Walk.crossFadeFrom(animations.actions.Run, 2);
    }, 3000);
  }, []);

  console.log(fox);
  return (
    <>
      <primitive
        object={fox.scene}
        // scale={0.2}
        // position={[-5, 0, 5]}
        // rotation={0.3}
      />
    </>
  );
}

export default Fox;
