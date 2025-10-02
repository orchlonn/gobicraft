import { VoxelData } from "../components/voxels-galaxy/VoxelObject";
import {
  fillBox,
  fillSphere,
  fillEllipsoid,
  fillCylinder,
  combineVoxels,
} from "../utils/voxelFill";

export interface VoxelObjectDefinition {
  name: string;
  description: string;
  voxels: VoxelData[];
  defaultColor?: string;
}

// Ultra-Dense Car object - 1000+ voxels
const carVoxels: VoxelData[] = combineVoxels(
  // Main car body (much larger, completely filled)
  fillBox(-8, 8, 0, 4, -3, 3, "#ff4444"),

  // Cabin/roof (larger, elevated)
  fillBox(-6, 6, 4, 7, -2, 2, "#ff6666"),

  // Wheels (much larger solid cylinders)
  fillCylinder(-6, -4, -2, 1, 2, "#222222"),
  fillCylinder(-6, 4, -2, 1, 2, "#222222"),
  fillCylinder(6, -4, -2, 1, 2, "#222222"),
  fillCylinder(6, 4, -2, 1, 2, "#222222"),

  // Engine block (much larger)
  fillBox(-10, -8, 0, 3, -2, 2, "#666666"),

  // Headlights (larger)
  fillSphere(-10, 2, -2, 1, "#ffff88"),
  fillSphere(-10, 2, 2, 1, "#ffff88"),

  // Taillights (larger)
  fillSphere(10, 2, -2, 1, "#ff0000"),
  fillSphere(10, 2, 2, 1, "#ff0000"),

  // Windows (larger, blue tinted)
  fillBox(-5, 5, 7, 7, -2, 2, "#4444ff"),

  // Bumpers (front and rear)
  fillBox(-9, -8, 0, 1, -3, 3, "#333333"),
  fillBox(8, 9, 0, 1, -3, 3, "#333333"),

  // Side panels (additional density)
  fillBox(-7, 7, 1, 3, -3, -3, "#cc3333"),
  fillBox(-7, 7, 1, 3, 3, 3, "#cc3333")
);

// Ultra-Dense cube object - 1000+ voxels
const cubeVoxels: VoxelData[] = fillBox(-5, 5, 0, 10, -5, 5, "#4444ff");

// Ultra-Dense Tree object - 1000+ voxels
const treeVoxels: VoxelData[] = combineVoxels(
  // Much larger solid trunk (cylinder)
  fillCylinder(0, 0, 0, 8, 3, "#8B4513"),

  // Massive solid leaf canopy (large sphere)
  fillSphere(0, 12, 0, 7, "#228B22"),

  // Multiple large leaf clusters for maximum density
  fillSphere(-4, 10, -4, 4, "#32CD32"),
  fillSphere(4, 10, 4, 4, "#32CD32"),
  fillSphere(-4, 14, 4, 4, "#228B22"),
  fillSphere(4, 14, -4, 4, "#228B22"),
  fillSphere(0, 16, 0, 3, "#228B22"),

  // Additional branch structures
  fillCylinder(-3, -3, 6, 8, 1, "#8B4513"),
  fillCylinder(3, 3, 6, 8, 1, "#8B4513"),

  // Root system (underground)
  fillSphere(0, -1, 0, 4, "#654321")
);

// Ultra-Dense House object - 1000+ voxels
const houseVoxels: VoxelData[] = combineVoxels(
  // Much larger foundation (solid)
  fillBox(-8, 8, 0, 2, -8, 8, "#8B4513"),

  // Main house structure (much larger solid walls)
  fillBox(-6, 6, 2, 8, -6, 6, "#D2691E"),

  // Multi-level roof structure (solid)
  fillBox(-7, 7, 8, 12, -7, 7, "#8B0000"),
  fillBox(-5, 5, 12, 14, -5, 5, "#8B0000"),

  // Large chimney (solid cylinder)
  fillCylinder(5, 5, 10, 16, 2, "#666666"),

  // Multiple doors
  fillBox(0, 1, 2, 6, -6, -6, "#654321"),
  fillBox(-6, -6, 2, 6, 0, 1, "#654321"),

  // Many windows (larger)
  fillBox(-6, -4, 4, 6, -2, 2, "#87CEEB"),
  fillBox(4, 6, 4, 6, -2, 2, "#87CEEB"),
  fillBox(-2, 2, 4, 6, -6, -4, "#87CEEB"),
  fillBox(-2, 2, 4, 6, 4, 6, "#87CEEB"),

  // Additional structural elements
  fillBox(-7, 7, 1, 1, -7, 7, "#A0522D"), // Base trim
  fillCylinder(-4, -4, 2, 8, 1, "#8B4513"), // Support pillars
  fillCylinder(4, -4, 2, 8, 1, "#8B4513"),
  fillCylinder(-4, 4, 2, 8, 1, "#8B4513"),
  fillCylinder(4, 4, 2, 8, 1, "#8B4513")
);

// Ultra-Dense Pyramid object - 1000+ voxels
const pyramidVoxels: VoxelData[] = (() => {
  const voxels: VoxelData[] = [];
  const height = 15;
  const baseSize = 12;

  for (let y = 0; y < height; y++) {
    const layerSize = baseSize - Math.floor((y * baseSize) / height);
    const halfSize = Math.floor(layerSize / 2);

    for (let x = -halfSize; x <= halfSize; x++) {
      for (let z = -halfSize; z <= halfSize; z++) {
        // Add slight color variation based on height
        const colorVariation = Math.floor((y / height) * 50);
        const r = Math.max(200, 255 - colorVariation);
        const g = Math.max(180, 215 - colorVariation);
        const color = `#${r.toString(16)}${g.toString(16)}00`;

        voxels.push({ x, y, z, color });
      }
    }
  }

  return voxels;
})();

// Ultra-Dense Spaceship object - 1000+ voxels
const spaceshipVoxels: VoxelData[] = combineVoxels(
  // Much larger main hull (solid ellipsoid)
  fillEllipsoid(0, 3, 0, 12, 4, 4, "#C0C0C0"),

  // Large cockpit section
  fillEllipsoid(8, 6, 0, 4, 3, 3, "#4169E1"),

  // Massive wings (solid filled)
  fillBox(-4, 4, 2, 4, -8, -6, "#808080"),
  fillBox(-4, 4, 2, 4, 6, 8, "#808080"),

  // Large engine nacelles (cylinders)
  fillCylinder(-12, -3, 1, 5, 2, "#FF4500"),
  fillCylinder(-12, 3, 1, 5, 2, "#FF4500"),

  // Additional engine details
  fillSphere(-14, -3, 1, 1, "#FF6347"),
  fillSphere(-14, 3, 1, 1, "#FF6347"),

  // Large weapon pods
  fillEllipsoid(10, 2, -3, 4, 2, 1, "#FF0000"),
  fillEllipsoid(10, 2, 3, 4, 2, 1, "#FF0000"),

  // Multi-layer hull reinforcement
  fillEllipsoid(0, 1, 0, 10, 2, 3, "#A0A0A0"),
  fillEllipsoid(0, 0, 0, 8, 2, 2, "#909090"),

  // Additional structural elements
  fillBox(-6, 6, 4, 5, -1, 1, "#B0B0B0"), // Upper hull
  fillBox(-8, 8, 0, 1, -2, 2, "#808080"), // Lower hull

  // Wing supports
  fillCylinder(0, -7, 2, 4, 1, "#606060"),
  fillCylinder(0, 7, 2, 4, 1, "#606060")
);

// Ultra-Dense Castle object - 1000+ voxels
const castleVoxels: VoxelData[] = combineVoxels(
  // Massive foundation (solid base)
  fillBox(-10, 10, 0, 3, -10, 10, "#8B4513"),

  // Large main castle walls (solid)
  fillBox(-8, 8, 3, 10, -8, 8, "#A0522D"),

  // Large corner towers (solid cylinders)
  fillCylinder(-8, -8, 3, 16, 4, "#654321"),
  fillCylinder(8, -8, 3, 16, 4, "#654321"),
  fillCylinder(-8, 8, 3, 16, 4, "#654321"),
  fillCylinder(8, 8, 3, 16, 4, "#654321"),

  // Massive central keep (solid tower)
  fillCylinder(0, 0, 4, 20, 6, "#8B4513"),

  // Large keep roof (cone-like)
  fillSphere(0, 22, 0, 6, "#8B0000"),

  // Tower roofs
  fillSphere(-8, 18, -8, 3, "#8B0000"),
  fillSphere(8, 18, -8, 3, "#8B0000"),
  fillSphere(-8, 18, 8, 3, "#8B0000"),
  fillSphere(8, 18, 8, 3, "#8B0000"),

  // Multiple tower flags
  fillBox(-8, -8, 17, 19, 0, 0, "#FF0000"),
  fillBox(8, 8, 17, 19, 0, 0, "#FF0000"),
  fillBox(-8, -8, 17, 19, 0, 0, "#FF0000"),
  fillBox(8, 8, 17, 19, 0, 0, "#FF0000"),

  // Large courtyard (filled)
  fillBox(-6, 6, 3, 3, -6, 6, "#D2691E"),

  // Additional defensive walls
  fillBox(-9, 9, 2, 2, -9, -8, "#A0522D"),
  fillBox(-9, 9, 2, 2, 8, 9, "#A0522D"),
  fillBox(-9, -8, 2, 2, -7, 7, "#A0522D"),
  fillBox(8, 9, 2, 2, -7, 7, "#A0522D"),

  // Watchtowers
  fillCylinder(0, -9, 3, 12, 2, "#654321"),
  fillCylinder(0, 9, 3, 12, 2, "#654321"),
  fillCylinder(-9, 0, 3, 12, 2, "#654321"),
  fillCylinder(9, 0, 3, 12, 2, "#654321")
);

// Ultra-Dense Dragon object - 1000+ voxels
const dragonVoxels: VoxelData[] = combineVoxels(
  // Large dragon head (solid ellipsoid)
  fillEllipsoid(12, 6, 0, 4, 4, 4, "#228B22"),

  // Large dragon eyes (glowing)
  fillSphere(15, 8, -2, 1, "#FF0000"),
  fillSphere(15, 8, 2, 1, "#FF0000"),

  // Massive dragon neck (solid cylinders, curved)
  fillCylinder(8, 0, 4, 8, 3, "#32CD32"),
  fillCylinder(4, 0, 2, 6, 3, "#32CD32"),

  // Enormous dragon body (large solid ellipsoid)
  fillEllipsoid(-4, 4, 0, 16, 6, 6, "#228B22"),

  // Massive dragon wings (solid filled)
  fillEllipsoid(-2, 8, -12, 8, 4, 6, "#8B4513"),
  fillEllipsoid(-2, 8, 12, 8, 4, 6, "#8B4513"),

  // Long dragon tail (solid, tapering)
  fillEllipsoid(-16, 2, 0, 12, 4, 4, "#228B22"),
  fillEllipsoid(-24, 0, 0, 6, 2, 2, "#228B22"),
  fillEllipsoid(-30, -1, 0, 3, 1, 1, "#228B22"),

  // Large dragon legs (solid cylinders)
  fillCylinder(2, -4, -4, 4, 2, "#654321"),
  fillCylinder(2, 4, -4, 4, 2, "#654321"),
  fillCylinder(-4, -4, -4, 4, 2, "#654321"),
  fillCylinder(-4, 4, -4, 4, 2, "#654321"),

  // Dragon spikes along back (larger)
  fillBox(-12, 8, 10, 12, 0, 0, "#8B0000"),

  // Additional dragon features
  fillEllipsoid(0, 3, 0, 12, 4, 4, "#32CD32"), // Belly
  fillSphere(14, 7, 0, 2, "#228B22"), // Snout
  fillCylinder(0, 0, -1, 1, 8, "#654321"), // Claws

  // Wing membrane details
  fillBox(-6, 2, 6, 10, -10, -8, "#A0522D"),
  fillBox(-6, 2, 6, 10, 8, 10, "#A0522D")
);

// Ultra-Dense Robot object - 1000+ voxels
const robotVoxels: VoxelData[] = combineVoxels(
  // Large robot head (solid box)
  fillBox(-4, 4, 16, 20, -4, 4, "#C0C0C0"),

  // Large robot eyes (glowing)
  fillSphere(-2, 18, -4, 1, "#00FF00"),
  fillSphere(2, 18, -4, 1, "#00FF00"),

  // Massive robot torso (solid box)
  fillBox(-6, 6, 6, 14, -6, 6, "#808080"),

  // Large robot arms (solid cylinders)
  fillCylinder(-8, 0, 8, 14, 2, "#696969"),
  fillCylinder(8, 0, 8, 14, 2, "#696969"),

  // Large robot legs (solid boxes)
  fillBox(-4, -2, 0, 6, -4, 4, "#696969"),
  fillBox(2, 4, 0, 6, -4, 4, "#696969"),

  // Large robot chest panel (solid)
  fillBox(-4, 4, 8, 12, -4, 4, "#4169E1"),

  // Large robot joints (spheres)
  fillSphere(-8, 10, 0, 2, "#FFD700"),
  fillSphere(8, 10, 0, 2, "#FFD700"),
  fillSphere(-2, 4, 0, 2, "#FFD700"),
  fillSphere(2, 4, 0, 2, "#FFD700"),

  // Large robot feet (solid)
  fillBox(-4, -2, -2, -2, -6, 6, "#A0A0A0"),
  fillBox(2, 4, -2, -2, -6, 6, "#A0A0A0"),

  // Additional robot details for maximum density
  fillBox(-5, 5, 15, 15, -3, 3, "#B0B0B0"), // Head details
  fillBox(-5, 5, 7, 7, -5, 5, "#707070"), // Torso details
  fillCylinder(0, 0, 8, 12, 3, "#606060"), // Central core

  // Shoulder pads
  fillSphere(-6, 12, 0, 2, "#909090"),
  fillSphere(6, 12, 0, 2, "#909090"),

  // Knee joints
  fillSphere(-3, 3, 0, 1, "#FFD700"),
  fillSphere(3, 3, 0, 1, "#FFD700"),

  // Additional structural elements
  fillBox(-7, 7, 5, 5, -7, 7, "#505050"), // Base platform
  fillCylinder(-6, 0, 6, 14, 1, "#404040"), // Left arm details
  fillCylinder(6, 0, 6, 14, 1, "#404040") // Right arm details
);

export const VOXEL_OBJECTS: Record<string, VoxelObjectDefinition> = {
  car: {
    name: "Car",
    description: "A simple voxel car with wheels, headlights, and windows",
    voxels: carVoxels,
    defaultColor: "#ff4444",
  },
  cube: {
    name: "Cube",
    description: "A basic 2x2x2 cube",
    voxels: cubeVoxels,
    defaultColor: "#4444ff",
  },
  tree: {
    name: "Tree",
    description: "A simple tree with trunk and leaves",
    voxels: treeVoxels,
    defaultColor: "#228B22",
  },
  house: {
    name: "House",
    description: "A basic house with walls, roof, and door",
    voxels: houseVoxels,
    defaultColor: "#D2691E",
  },
  pyramid: {
    name: "Pyramid",
    description: "A simple pyramid structure",
    voxels: pyramidVoxels,
    defaultColor: "#FFD700",
  },
  spaceship: {
    name: "Spaceship",
    description: "A detailed futuristic spaceship with engines and weapons",
    voxels: spaceshipVoxels,
    defaultColor: "#C0C0C0",
  },
  castle: {
    name: "Castle",
    description: "A medieval castle with towers, walls, and flags",
    voxels: castleVoxels,
    defaultColor: "#8B4513",
  },
  dragon: {
    name: "Dragon",
    description: "A majestic dragon with wings, spikes, and glowing eyes",
    voxels: dragonVoxels,
    defaultColor: "#228B22",
  },
  robot: {
    name: "Robot",
    description: "A large humanoid robot with glowing eyes and joints",
    voxels: robotVoxels,
    defaultColor: "#808080",
  },
};

export const getVoxelObject = (name: string): VoxelObjectDefinition | null => {
  return VOXEL_OBJECTS[name.toLowerCase()] || null;
};

export const getAllVoxelObjectNames = (): string[] => {
  return Object.keys(VOXEL_OBJECTS);
};
