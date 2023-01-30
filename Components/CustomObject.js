import React from "react";
import * as THREE from "three";
import { meshReflectorMaterial } from "@react-three/drei";

import { useMemo, useRef, useEffect } from "react";

function CustomObject() {
  const verticesCount = 10 * 3;

  const geometryRef = useRef();
  const positions = useMemo(() => {
    const positions = new Float32Array(verticesCount * 3);

    for (let i = 0; i < verticesCount; i++) {
      positions[i] = (Math.random() - 0.5) * 3;
    }

    return positions;
  }, []);

  useEffect(() => {
    geometryRef.current.computeVertexNormals();
  }, []);

  return (
    <mesh>
      <bufferGeometry ref={geometryRef}>
        <bufferAttribute
          attach="attributes-position"
          count={verticesCount}
          itemSize={3}
          array={positions}
        />
      </bufferGeometry>

      <meshStandardMaterial color="mediumpurple" side={THREE.DoubleSide} />
      {/* <meshReflectorMaterial/> */}
    </mesh>
  );
}

export default CustomObject;
