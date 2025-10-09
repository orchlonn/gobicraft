import * as THREE from "three";
import { VoxelData } from "@/model/voxel.interface";
import { TransitionVoxel } from "@/model/voxel.interface";

// Create a unique ID for a voxel based on its position
function createVoxelId(x: number, y: number, z: number): string {
  return `${x}_${y}_${z}`;
}

// Calculate the transition between two voxel sets
export function calculateTransition(
  fromVoxels: VoxelData[],
  toVoxels: VoxelData[],
  progress: number
): TransitionVoxel[] {
  const transitionVoxels: TransitionVoxel[] = [];

  // Create maps for easier lookup
  const fromMap = new Map<string, VoxelData>();
  const toMap = new Map<string, VoxelData>();

  fromVoxels.forEach((voxel) => {
    fromMap.set(createVoxelId(voxel.x, voxel.y, voxel.z), voxel);
  });

  toVoxels.forEach((voxel) => {
    toMap.set(createVoxelId(voxel.x, voxel.y, voxel.z), voxel);
  });

  // Get all unique positions
  const allPositions = new Set([...fromMap.keys(), ...toMap.keys()]);

  allPositions.forEach((positionId) => {
    const fromVoxel = fromMap.get(positionId);
    const toVoxel = toMap.get(positionId);

    if (fromVoxel && toVoxel) {
      // Voxel exists in both - interpolate color
      const fromColor = new THREE.Color(fromVoxel.color);
      const toColor = new THREE.Color(toVoxel.color);
      const interpolatedColor = fromColor.clone().lerp(toColor, progress);

      transitionVoxels.push({
        id: positionId,
        x: fromVoxel.x,
        y: fromVoxel.y,
        z: fromVoxel.z,
        color: `#${interpolatedColor.getHexString()}`,
        opacity: 1,
        scale: 1,
      });
    } else if (fromVoxel && !toVoxel) {
      // Voxel disappearing - fade out and shrink
      const opacity = 1 - progress;
      const scale = 1 - progress * 0.9; // Shrink to 10% of original size for smoother disappearance

      if (opacity > 0.05) {
        // Only render if still visible
        transitionVoxels.push({
          id: positionId,
          x: fromVoxel.x,
          y: fromVoxel.y,
          z: fromVoxel.z,
          color: fromVoxel.color,
          opacity,
          scale,
        });
      }
    } else if (!fromVoxel && toVoxel) {
      // Voxel appearing - fade in and grow
      const opacity = progress;
      const scale = progress * 0.9 + 0.1; // Grow from 10% to 100% for smoother appearance

      if (opacity > 0.05) {
        // Only render if visible enough
        transitionVoxels.push({
          id: positionId,
          x: toVoxel.x,
          y: toVoxel.y,
          z: toVoxel.z,
          color: toVoxel.color,
          opacity,
          scale,
        });
      }
    }
  });

  return transitionVoxels;
}

// Smooth easing function for more natural transitions
export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// Create a transition animation
export function createTransitionAnimation(
  fromVoxels: VoxelData[],
  toVoxels: VoxelData[],
  duration: number = 1000, // milliseconds
  onUpdate: (voxels: TransitionVoxel[], progress: number) => void,
  onComplete: () => void
) {
  const startTime = Date.now();

  function animate() {
    const elapsed = Date.now() - startTime;
    const rawProgress = Math.min(elapsed / duration, 1);
    const easedProgress = easeInOutCubic(rawProgress);

    const transitionVoxels = calculateTransition(
      fromVoxels,
      toVoxels,
      easedProgress
    );
    onUpdate(transitionVoxels, easedProgress);

    if (rawProgress < 1) {
      requestAnimationFrame(animate);
    } else {
      onComplete();
    }
  }

  animate();
}

// Utility to find the closest voxel in the target set (for more complex transitions)
export function findClosestVoxel(
  sourceVoxel: VoxelData,
  targetVoxels: VoxelData[]
): VoxelData | null {
  if (targetVoxels.length === 0) return null;

  let closest = targetVoxels[0];
  let minDistance = Infinity;

  targetVoxels.forEach((target) => {
    const distance = Math.sqrt(
      Math.pow(sourceVoxel.x - target.x, 2) +
        Math.pow(sourceVoxel.y - target.y, 2) +
        Math.pow(sourceVoxel.z - target.z, 2)
    );

    if (distance < minDistance) {
      minDistance = distance;
      closest = target;
    }
  });

  return closest;
}
