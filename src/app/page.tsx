"use client";

import DynamicVoxelScene, {
  useVoxelScene,
} from "../components/voxels-galaxy/DynamicVoxelScene";
import Chatbot, { VoxelCommand } from "../components/Chatbot";

export default function Home() {
  const {
    currentObject,
    objectColor,
    objectScale,
    objectRotation,
    changeObject,
    changeColor,
    changeScale,
  } = useVoxelScene();

  // Handle commands from the chatbot
  const handleChatbotCommand = (command: VoxelCommand) => {
    switch (command.action) {
      case "change_object":
        if (command.object) {
          changeObject(command.object);
        }
        if (command.color) {
          changeColor(command.color);
        }
        if (command.scale) {
          changeScale(command.scale);
        }
        break;
      case "change_color":
        if (command.color) {
          changeColor(command.color);
        }
        break;
      case "change_scale":
        if (command.scale) {
          changeScale(command.scale);
        }
        break;
    }
  };

  return (
    <div className="w-full h-screen flex">
      {/* Main 3D Scene */}
      <div className="flex-1">
        <DynamicVoxelScene
          currentObject={currentObject}
          objectColor={objectColor}
          objectScale={objectScale}
          objectRotation={objectRotation}
        />
      </div>

      {/* AI Chatbot on the right side */}
      <Chatbot onCommand={handleChatbotCommand} />
    </div>
  );
}
