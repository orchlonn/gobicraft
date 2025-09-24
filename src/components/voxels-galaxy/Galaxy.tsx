"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";

export default function Galaxy() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Generate galaxy data
  const { positions, colors, scales } = useMemo(() => {
    const count = 1000; // Number of cubes
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
  useEffect(() => {
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

  // Add subtle rotation animation
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <instancedMesh
        ref={meshRef}
        args={[undefined, undefined, positions.length / 3]}
      >
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial />
      </instancedMesh>
    </group>
  );
}
