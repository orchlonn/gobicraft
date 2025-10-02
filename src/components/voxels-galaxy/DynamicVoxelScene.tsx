"use client";

import { useState, useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import VoxelObject, { VoxelData } from "./VoxelObject";
import Starfield from "./Starfield";
import { VOXEL_OBJECTS, getVoxelObject } from "../../data/voxelObjects";
import {
  createTransitionAnimation,
  TransitionVoxel,
} from "../../utils/voxelTransitions";

interface DynamicVoxelSceneProps {
  currentObject?: string;
  objectColor?: string;
  objectScale?: [number, number, number];
  objectRotation?: [number, number, number];
}

export default function DynamicVoxelScene({
  currentObject = "car",
  objectColor,
  objectScale = [1, 1, 1],
  objectRotation = [0, 0, 0],
}: DynamicVoxelSceneProps) {
  const [displayVoxels, setDisplayVoxels] = useState<
    VoxelData[] | TransitionVoxel[]
  >([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const currentObjectRef = useRef(currentObject);
  const voxelObjectData = getVoxelObject(currentObject);

  // Initialize with the first object
  useEffect(() => {
    if (voxelObjectData && displayVoxels.length === 0) {
      setDisplayVoxels(voxelObjectData.voxels);
      currentObjectRef.current = currentObject;
    }
  }, [voxelObjectData, displayVoxels.length, currentObject]);

  // Handle object transitions
  useEffect(() => {
    if (currentObject !== currentObjectRef.current && voxelObjectData) {
      const fromVoxels = displayVoxels as VoxelData[];
      const toVoxels = voxelObjectData.voxels;

      if (fromVoxels.length > 0 && !isTransitioning) {
        setIsTransitioning(true);

        createTransitionAnimation(
          fromVoxels,
          toVoxels,
          1500, // 1.5 seconds transition for better pixel detail appreciation
          (transitionVoxels: TransitionVoxel[]) => {
            setDisplayVoxels(transitionVoxels);
          },
          () => {
            setDisplayVoxels(toVoxels);
            setIsTransitioning(false);
            currentObjectRef.current = currentObject;
          }
        );
      } else if (fromVoxels.length === 0) {
        setDisplayVoxels(toVoxels);
        currentObjectRef.current = currentObject;
      }
    }
  }, [currentObject, voxelObjectData, displayVoxels, isTransitioning]);

  return (
    <div className="w-full h-screen bg-white">
      <Canvas
        camera={{
          position: [25, 20, 25],
          fov: 75,
        }}
        gl={{ antialias: true }}
      >
        {/* Ambient light for general illumination */}
        <ambientLight intensity={0.4} />

        {/* Main directional light for depth and shadows */}
        <directionalLight
          position={[10, 15, 10]}
          intensity={1.2}
          color="#ffffff"
          castShadow
        />

        {/* Secondary directional light for fill lighting */}
        <directionalLight
          position={[-5, 8, -5]}
          intensity={0.6}
          color="#ffffff"
        />

        {/* Point light at center for object glow */}
        <pointLight
          position={[0, 3, 0]}
          intensity={0.8}
          color="#ffffff"
          distance={15}
          decay={1}
        />

        {/* Background starfield */}
        <Starfield />

        {/* Dynamic voxel object with transitions */}
        {displayVoxels.length > 0 && (
          <VoxelObject
            voxels={displayVoxels}
            position={[0, 2, 0]}
            scale={objectScale}
            rotation={objectRotation}
            globalColor={objectColor}
            isTransitioning={isTransitioning}
          />
        )}

        {/* OrbitControls for camera movement */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={10}
          maxDistance={100}
          autoRotate={true}
          autoRotateSpeed={0.8}
        />
      </Canvas>
    </div>
  );
}

// Export a hook for managing scene state (useful for chatbot integration)
export function useVoxelScene() {
  const [currentObject, setCurrentObject] = useState("car");
  const [objectColor, setObjectColor] = useState<string | undefined>(undefined);
  const [objectScale, setObjectScale] = useState<[number, number, number]>([
    1, 1, 1,
  ]);
  const [objectRotation, setObjectRotation] = useState<
    [number, number, number]
  >([0, 0, 0]);

  const changeObject = (objectName: string) => {
    const obj = getVoxelObject(objectName);
    if (obj) {
      setCurrentObject(objectName);
      // Reset transformations when changing objects
      setObjectScale([1, 1, 1]);
      setObjectRotation([0, 0, 0]);
      // Keep color if it was set, otherwise reset
      if (!objectColor) {
        setObjectColor(undefined);
      }
    }
  };

  const changeColor = (color: string) => {
    setObjectColor(color);
  };

  const changeScale = (scale: [number, number, number]) => {
    setObjectScale(scale);
  };

  const changeRotation = (rotation: [number, number, number]) => {
    setObjectRotation(rotation);
  };

  const resetObject = () => {
    setObjectColor(undefined);
    setObjectScale([1, 1, 1]);
    setObjectRotation([0, 0, 0]);
  };

  const getAvailableObjects = () => {
    return Object.keys(VOXEL_OBJECTS);
  };

  return {
    currentObject,
    objectColor,
    objectScale,
    objectRotation,
    changeObject,
    changeColor,
    changeScale,
    changeRotation,
    resetObject,
    getAvailableObjects,
  };
}
