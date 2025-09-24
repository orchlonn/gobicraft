"use client";

import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";

export default function Starfield() {
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
  useEffect(() => {
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
