// Utility functions for parsing chatbot commands and controlling voxel objects
// This will be the bridge between your chatbot and the voxel scene

export interface CommandResult {
  success: boolean;
  message: string;
  action?: {
    type: "changeObject" | "changeColor" | "changeScale" | "reset";
    value?: string | [number, number, number];
  };
}

// Simple command parser (you can replace this with AI/NLP later)
export function parseCommand(input: string): CommandResult {
  const command = input.toLowerCase().trim();

  // Object change commands
  if (
    command.includes("turn into") ||
    command.includes("change to") ||
    command.includes("make it a")
  ) {
    const objects = [
      "car",
      "cube",
      "tree",
      "house",
      "pyramid",
      "spaceship",
      "castle",
      "dragon",
      "robot",
    ];
    const foundObject = objects.find((obj) => command.includes(obj));

    if (foundObject) {
      return {
        success: true,
        message: `Transforming into ${foundObject} with smooth transition...`,
        action: { type: "changeObject", value: foundObject },
      };
    }
  }

  // Color change commands
  if (
    command.includes("make it") &&
    (command.includes("red") ||
      command.includes("blue") ||
      command.includes("green") ||
      command.includes("yellow") ||
      command.includes("purple") ||
      command.includes("orange") ||
      command.includes("white") ||
      command.includes("black"))
  ) {
    const colorMap: Record<string, string> = {
      red: "#ff4444",
      blue: "#4444ff",
      green: "#44ff44",
      yellow: "#ffff44",
      purple: "#ff44ff",
      orange: "#ff8844",
      white: "#ffffff",
      black: "#222222",
    };

    const foundColor = Object.keys(colorMap).find((color) =>
      command.includes(color)
    );
    if (foundColor) {
      return {
        success: true,
        message: `Changing color to ${foundColor}`,
        action: { type: "changeColor", value: colorMap[foundColor] },
      };
    }
  }

  // Size change commands
  if (
    command.includes("make it bigger") ||
    command.includes("scale up") ||
    command.includes("larger")
  ) {
    return {
      success: true,
      message: "Making it bigger",
      action: { type: "changeScale", value: [2, 2, 2] },
    };
  }

  if (
    command.includes("make it smaller") ||
    command.includes("scale down") ||
    command.includes("tiny")
  ) {
    return {
      success: true,
      message: "Making it smaller",
      action: { type: "changeScale", value: [0.5, 0.5, 0.5] },
    };
  }

  if (
    command.includes("normal size") ||
    command.includes("regular size") ||
    command.includes("default size")
  ) {
    return {
      success: true,
      message: "Resetting to normal size",
      action: { type: "changeScale", value: [1, 1, 1] },
    };
  }

  // Reset commands
  if (
    command.includes("reset") ||
    command.includes("start over") ||
    command.includes("clear")
  ) {
    return {
      success: true,
      message: "Resetting object",
      action: { type: "reset" },
    };
  }

  // Default response for unrecognized commands
  return {
    success: false,
    message:
      "I didn't understand that command. Try: 'turn into car', 'make it red', 'make it bigger', or 'reset'",
  };
}

// Example commands for testing
export const EXAMPLE_COMMANDS = [
  "turn into car",
  "change to tree",
  "turn into spaceship",
  "change to dragon",
  "turn into castle",
  "make it a robot",
  "make it red",
  "make it blue",
  "make it bigger",
  "make it smaller",
  "reset",
  "turn into dragon and make it green",
  "change to spaceship and make it bigger",
];

// Function to handle combined commands (for Phase 5)
export function parseCombinedCommand(input: string): CommandResult[] {
  const commands = input.split(" and ").map((cmd) => cmd.trim());
  return commands.map(parseCommand);
}
