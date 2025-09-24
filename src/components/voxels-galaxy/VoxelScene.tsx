"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Starfield from "./Starfield";
import Galaxy from "./Galaxy";

export default function VoxelScene() {
  return (
    <div className="w-full h-screen bg-white">
      <Canvas
        camera={{
          position: [30, 15, 30],
          fov: 60,
        }}
        gl={{ antialias: true }}
      >
        {/* Ambient light for general illumination */}
        <ambientLight intensity={0.2} />

        {/* Directional light for depth */}
        <directionalLight
          position={[50, 50, 25]}
          intensity={0.8}
          color="#ffffff"
        />

        {/* Point light at center for galaxy glow */}
        <pointLight
          position={[0, 0, 0]}
          intensity={1.5}
          color="#4169e1"
          distance={50}
          decay={2}
        />

        {/* Background starfield with 1000 pixels */}
        <Starfield />

        {/* The galaxy made of hundreds of cubes */}
        <Galaxy />

        {/* OrbitControls for camera movement */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={10}
          maxDistance={100}
          autoRotate={true}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
