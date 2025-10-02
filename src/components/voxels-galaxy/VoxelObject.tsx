"use client";

import { useRef, useMemo, useEffect } from "react";
import * as THREE from "three";
import { TransitionVoxel } from "../../utils/voxelTransitions";

export interface VoxelData {
  x: number;
  y: number;
  z: number;
  color: string;
}

interface VoxelObjectProps {
  voxels: VoxelData[] | TransitionVoxel[];
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  globalColor?: string; // Override all voxel colors
  isTransitioning?: boolean;
}

export default function VoxelObject({
  voxels,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  globalColor,
  isTransitioning = false,
}: VoxelObjectProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const groupRef = useRef<THREE.Group>(null);

  // Set up instanced mesh
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Apply transformations to instances
  useEffect(() => {
    if (!meshRef.current || voxels.length === 0) return;

    voxels.forEach((voxel, i) => {
      // Handle transition voxels with individual scaling and opacity
      const transitionVoxel = voxel as TransitionVoxel;
      const voxelScale = transitionVoxel.scale || 1;
      const voxelOpacity = transitionVoxel.opacity || 1;

      dummy.position.set(voxel.x, voxel.y, voxel.z);
      dummy.rotation.set(0, 0, 0);
      dummy.scale.set(voxelScale, voxelScale, voxelScale);

      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);

      // Use global color if provided, otherwise use voxel's color
      const baseColor = new THREE.Color(globalColor || voxel.color);

      // Apply opacity for transitions
      if (isTransitioning && voxelOpacity < 1) {
        // Create a slightly transparent version of the color
        baseColor.multiplyScalar(voxelOpacity);
      }

      meshRef.current!.setColorAt(i, baseColor);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  }, [voxels, dummy, globalColor, isTransitioning]);

  // Update group transformations
  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.position.set(...position);
      groupRef.current.rotation.set(...rotation);
      groupRef.current.scale.set(...scale);
    }
  }, [position, rotation, scale]);

  if (voxels.length === 0) return null;

  return (
    <group ref={groupRef}>
      <instancedMesh ref={meshRef} args={[undefined, undefined, voxels.length]}>
        <boxGeometry args={[0.15, 0.15, 0.15]} />
        <meshStandardMaterial
          transparent={isTransitioning}
          opacity={isTransitioning ? 0.9 : 1.0}
        />
      </instancedMesh>
    </group>
  );
}
