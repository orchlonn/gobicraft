"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function Starfield() {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  // Generate starfield data
  const { positions, colors, scales } = useMemo(() => {
    const count = 1000; // Number of background pixels/stars
    const positions = [];
    const colors = [];
    const scales = [];

    const range = 200; // How far the stars extend

    for (let i = 0; i < count; i++) {
      // Random positions in a large sphere around the galaxy
      const x = (Math.random() - 0.5) * range * 2;
      const y = (Math.random() - 0.5) * range * 2;
      const z = (Math.random() - 0.5) * range * 2;

      positions.push(x, y, z);

      // Star colors - mostly white with some variation
      const brightness = 0.4 + Math.random() * 0.6;
      const tint = Math.random();

      let color;
      if (tint < 0.7) {
        // White stars
        color = new THREE.Color(brightness, brightness, brightness);
      } else if (tint < 0.9) {
        // Slightly blue stars
        color = new THREE.Color(brightness * 0.8, brightness * 0.9, brightness);
      } else {
        // Slightly red stars
        color = new THREE.Color(brightness, brightness * 0.8, brightness * 0.7);
      }

      colors.push(color.r, color.g, color.b);

      // Very small scale for pixel-like appearance
      const scale = 0.05 + Math.random() * 0.1;
      scales.push(scale);
    }

    return { positions, colors, scales };
  }, []);

  // Set up instanced mesh
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Apply transformations to instances
  useMemo(() => {
    if (!meshRef.current) return;

    for (let i = 0; i < positions.length / 3; i++) {
      dummy.position.set(
        positions[i * 3],
        positions[i * 3 + 1],
        positions[i * 3 + 2]
      );

      // No rotation needed for pixels
      dummy.rotation.set(0, 0, 0);

      // Scale
      const scale = scales[i];
      dummy.scale.set(scale, scale, scale);

      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      // Set color
      meshRef.current.setColorAt(
        i,
        new THREE.Color(colors[i * 3], colors[i * 3 + 1], colors[i * 3 + 2])
      );
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [positions, colors, scales, dummy]);

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, positions.length / 3]}
    >
      <boxGeometry args={[0.1, 0.1, 0.1]} />
      <meshBasicMaterial />
    </instancedMesh>
  );
}

function Galaxy() {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  // Generate galaxy data
  const { positions, colors, scales } = useMemo(() => {
    const count = 800; // Number of cubes
    const positions = [];
    const colors = [];
    const scales = [];

    // Galaxy parameters
    const arms = 3; // Number of spiral arms
    const armSpread = 0.5;
    const coreRadius = 2;
    const galaxyRadius = 25;

    for (let i = 0; i < count; i++) {
      // Create spiral galaxy pattern
      const armIndex = i % arms;
      const progress = i / count;

      // Spiral angle
      const angle = (armIndex * (Math.PI * 2)) / arms + progress * Math.PI * 4;

      // Distance from center (more dense in center)
      const radius = coreRadius + Math.pow(Math.random(), 0.5) * galaxyRadius;

      // Add some randomness to the spiral
      const offsetAngle = (Math.random() - 0.5) * armSpread;
      const finalAngle = angle + offsetAngle;

      // Position
      const x = Math.cos(finalAngle) * radius + (Math.random() - 0.5) * 4;
      const z = Math.sin(finalAngle) * radius + (Math.random() - 0.5) * 4;
      const y = (Math.random() - 0.5) * 8 * Math.exp(-radius / 15); // Flatten towards edges

      positions.push(x, y, z);

      // Colors - vary based on distance from center and randomness
      const centerDistance = Math.sqrt(x * x + y * y + z * z);
      const hue = (0.6 + Math.random() * 0.4) % 1; // Blue to purple range
      const saturation = 0.7 + Math.random() * 0.3;
      const lightness =
        Math.max(0.3, 1 - centerDistance / 30) * (0.5 + Math.random() * 0.5);

      const color = new THREE.Color().setHSL(hue, saturation, lightness);
      colors.push(color.r, color.g, color.b);

      // Scale - smaller cubes towards the edges
      const scale =
        Math.max(0.1, 1 - centerDistance / 40) * (0.3 + Math.random() * 0.7);
      scales.push(scale);
    }

    return { positions, colors, scales };
  }, []);

  // Set up instanced mesh
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Apply transformations to instances
  useMemo(() => {
    if (!meshRef.current) return;

    for (let i = 0; i < positions.length / 3; i++) {
      dummy.position.set(
        positions[i * 3],
        positions[i * 3 + 1],
        positions[i * 3 + 2]
      );

      // Random rotation for each cube
      dummy.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );

      // Scale
      const scale = scales[i];
      dummy.scale.set(scale, scale, scale);

      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);

      // Set color
      meshRef.current.setColorAt(
        i,
        new THREE.Color(colors[i * 3], colors[i * 3 + 1], colors[i * 3 + 2])
      );
    }

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [positions, colors, scales, dummy]);

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, positions.length / 3]}
    >
      <boxGeometry args={[0.5, 0.5, 0.5]} />
      <meshStandardMaterial />
    </instancedMesh>
  );
}

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
