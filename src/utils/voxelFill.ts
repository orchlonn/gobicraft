import { VoxelData } from "../components/voxels-galaxy/VoxelObject";

// Utility functions to create solid, filled voxel objects

// Fill a rectangular box with voxels
export function fillBox(
  minX: number,
  maxX: number,
  minY: number,
  maxY: number,
  minZ: number,
  maxZ: number,
  color: string
): VoxelData[] {
  const voxels: VoxelData[] = [];

  for (let x = minX; x <= maxX; x++) {
    for (let y = minY; y <= maxY; y++) {
      for (let z = minZ; z <= maxZ; z++) {
        voxels.push({ x, y, z, color });
      }
    }
  }

  return voxels;
}

// Fill a sphere with voxels
export function fillSphere(
  centerX: number,
  centerY: number,
  centerZ: number,
  radius: number,
  color: string
): VoxelData[] {
  const voxels: VoxelData[] = [];

  for (let x = centerX - radius; x <= centerX + radius; x++) {
    for (let y = centerY - radius; y <= centerY + radius; y++) {
      for (let z = centerZ - radius; z <= centerZ + radius; z++) {
        const distance = Math.sqrt(
          Math.pow(x - centerX, 2) +
            Math.pow(y - centerY, 2) +
            Math.pow(z - centerZ, 2)
        );

        if (distance <= radius) {
          voxels.push({ x, y, z, color });
        }
      }
    }
  }

  return voxels;
}

// Fill an ellipsoid with voxels
export function fillEllipsoid(
  centerX: number,
  centerY: number,
  centerZ: number,
  radiusX: number,
  radiusY: number,
  radiusZ: number,
  color: string
): VoxelData[] {
  const voxels: VoxelData[] = [];

  for (let x = centerX - radiusX; x <= centerX + radiusX; x++) {
    for (let y = centerY - radiusY; y <= centerY + radiusY; y++) {
      for (let z = centerZ - radiusZ; z <= centerZ + radiusZ; z++) {
        const normalizedDistance =
          Math.pow((x - centerX) / radiusX, 2) +
          Math.pow((y - centerY) / radiusY, 2) +
          Math.pow((z - centerZ) / radiusZ, 2);

        if (normalizedDistance <= 1) {
          voxels.push({ x, y, z, color });
        }
      }
    }
  }

  return voxels;
}

// Fill a cylinder with voxels
export function fillCylinder(
  centerX: number,
  centerZ: number,
  minY: number,
  maxY: number,
  radius: number,
  color: string
): VoxelData[] {
  const voxels: VoxelData[] = [];

  for (let x = centerX - radius; x <= centerX + radius; x++) {
    for (let y = minY; y <= maxY; y++) {
      for (let z = centerZ - radius; z <= centerZ + radius; z++) {
        const distance = Math.sqrt(
          Math.pow(x - centerX, 2) + Math.pow(z - centerZ, 2)
        );

        if (distance <= radius) {
          voxels.push({ x, y, z, color });
        }
      }
    }
  }

  return voxels;
}

// Create a gradient color based on position
export function getGradientColor(
  x: number,
  y: number,
  z: number,
  baseColor: string,
  variation: number = 0.2
): string {
  // Create slight color variations based on position
  const hash = Math.sin(x * 12.9898 + y * 78.233 + z * 37.719) * 43758.5453;
  const variation1 = (hash - Math.floor(hash)) * variation * 2 - variation;

  // Parse hex color
  const hex = baseColor.replace("#", "");
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);

  // Apply variation
  const newR = Math.max(0, Math.min(255, Math.round(r * (1 + variation1))));
  const newG = Math.max(0, Math.min(255, Math.round(g * (1 + variation1))));
  const newB = Math.max(0, Math.min(255, Math.round(b * (1 + variation1))));

  return `#${newR.toString(16).padStart(2, "0")}${newG
    .toString(16)
    .padStart(2, "0")}${newB.toString(16).padStart(2, "0")}`;
}

// Combine multiple voxel arrays
export function combineVoxels(...voxelArrays: VoxelData[][]): VoxelData[] {
  const combined: VoxelData[] = [];
  const positionSet = new Set<string>();

  for (const voxelArray of voxelArrays) {
    for (const voxel of voxelArray) {
      const key = `${voxel.x},${voxel.y},${voxel.z}`;
      if (!positionSet.has(key)) {
        combined.push(voxel);
        positionSet.add(key);
      }
    }
  }

  return combined;
}

// Add noise/randomness to make objects more organic
export function addNoise(
  voxels: VoxelData[],
  noiseLevel: number = 0.1
): VoxelData[] {
  return voxels.filter(() => Math.random() > noiseLevel);
}
