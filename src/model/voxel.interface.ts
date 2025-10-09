export interface VoxelData {
  x: number;
  y: number;
  z: number;
  color: string;
}

export interface VoxelObjectProps {
  voxels: VoxelData[] | TransitionVoxel[];
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
  globalColor?: string; // Override all voxel colors
  isTransitioning?: boolean;
}

export interface TransitionVoxel extends VoxelData {
  id: string;
  targetX?: number;
  targetY?: number;
  targetZ?: number;
  targetColor?: string;
  opacity?: number;
  scale?: number;
}

export interface TransitionState {
  voxels: TransitionVoxel[];
  progress: number; // 0 to 1
  isTransitioning: boolean;
}

export interface VoxelData {
  x: number;
  y: number;
  z: number;
  color: string;
}
