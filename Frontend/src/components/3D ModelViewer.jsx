// src/components/ModelViewer.jsx
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';

function Model() {
  const gltf = useGLTF('/src/assets/images/MT 15.glb'); // public folder path
  return <primitive object={gltf.scene} scale={1.5} />;
}

export default function ModelViewer() {
  return (
    <div className="w-full h-screen">
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Suspense fallback={<span>Loading 3D Model...</span>}>
          <Model />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
}