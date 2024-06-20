// components/ThreeDModel.js
'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function Model() {
  const { scene } = useGLTF('/model.glb');
  const modelRef = useRef();

  // Calculate bounding box to adjust the position
  const box = new THREE.Box3().setFromObject(scene);
  const height = box.max.y - box.min.y;

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.01; // Adjust the speed as needed
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={[2.3, 2.3, 2.3]} 
      position={[0, - 1.1 * height / 2, 0]}
    />
  );
}

const ThreeDModel = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 0, 5]} />
      <Model />
      <OrbitControls />
    </Canvas>
  );
};

export default ThreeDModel;
