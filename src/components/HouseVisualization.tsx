"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { QuoteInput } from "../types/quote";

interface HouseVisualizationProps {
  quoteInput: QuoteInput;
}

// House Model Component
function HouseModel({ modelPath }: { modelPath: string }) {
  const { scene } = useGLTF(modelPath);
  return <primitive object={scene} scale={[1, 1, 1]} position={[0, 0, 0]} />;
}

// Fallback component for when model fails to load
function ModelFallback() {
  return (
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[1, 0.83, 1]} />
      <meshStandardMaterial color="#666666" wireframe />
    </mesh>
  );
}

// Loading Fallback Component
function LoadingFallback() {
  return (
    <mesh position={[0, 0, 0]}>
      <boxGeometry args={[1, 0.83, 1]} />
      <meshStandardMaterial color="#cccccc" wireframe />
    </mesh>
  );
}

export default function HouseVisualization({ quoteInput }: HouseVisualizationProps) {
  // Always use the 2 bed 1 bath model since we only have one model available
  const getModelPath = () => {
    return `/models/houses/2bed_1bath.glb`;
  };

    return (
    <div className="relative w-full h-full min-h-[350px] rounded-lg border border-gray-200 overflow-hidden">
      {/* Three.js Canvas */}
      <Canvas
        camera={{ 
          position: [-4, 3, -2], 
          fov: 60,
          near: 0.1,
          far: 1000 
        }}
        style={{ 
          width: '100%', 
          height: '100%', 
          minHeight: '350px',
          background: '#f8fafc',
          display: 'block',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.3} />

        {/* House Model */}
        <Suspense fallback={<LoadingFallback />}>
          <HouseModel modelPath={getModelPath()} />
        </Suspense>

                 {/* Controls */}
         <OrbitControls 
           enablePan={false}
           enableZoom={true}
           enableRotate={true}
           minDistance={2}
           maxDistance={8}
           minPolarAngle={Math.PI / 6}
           maxPolarAngle={Math.PI / 2}
           autoRotate
           autoRotateSpeed={1}
         />
             </Canvas>

       {/* Info display */}
       <div className="absolute bottom-4 left-4 bg-white bg-opacity-95 rounded-lg p-3 shadow-lg border backdrop-blur-sm">
         <div className="text-sm font-semibold text-gray-800 flex items-center gap-2">
           <span className="text-blue-600">🛏️ {quoteInput.bedrooms}</span>
           <span className="text-green-600">🚿 {quoteInput.bathrooms}</span>
         </div>
         <div className="text-xs text-gray-600 mt-1">
           {quoteInput.frequency} cleaning
         </div>
       </div>
    </div>
  );
}

// Preload the 2 bed 1 bath model (only model available)
useGLTF.preload('/models/houses/2bed_1bath.glb'); 