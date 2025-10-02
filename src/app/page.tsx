"use client";

import DynamicVoxelScene, {
  useVoxelScene,
} from "../components/voxels-galaxy/DynamicVoxelScene";

export default function Home() {
  const {
    currentObject,
    objectColor,
    objectScale,
    objectRotation,
    changeObject,
    changeColor,
    changeScale,
    resetObject,
    getAvailableObjects,
  } = useVoxelScene();

  return (
    <div className="w-full h-screen flex">
      {/* Sidebar for controls (temporary - will be replaced with chatbot) */}
      <div className="w-80 bg-gray-900 text-white p-4 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">Voxel Controls</h2>

        {/* Object Selection */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Objects</h3>
          <div className="grid grid-cols-2 gap-2">
            {getAvailableObjects().map((objName) => (
              <button
                key={objName}
                onClick={() => changeObject(objName)}
                className={`p-2 rounded text-sm capitalize ${
                  currentObject === objName
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                {objName}
              </button>
            ))}
          </div>
        </div>

        {/* Color Controls */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Colors</h3>
          <div className="grid grid-cols-4 gap-2">
            {[
              "#ff4444",
              "#44ff44",
              "#4444ff",
              "#ffff44",
              "#ff44ff",
              "#44ffff",
              "#ffffff",
              "#888888",
              "#ff8844",
              "#88ff44",
              "#4488ff",
              "#ff4488",
            ].map((color) => (
              <button
                key={color}
                onClick={() => changeColor(color)}
                className="w-8 h-8 rounded border-2 border-gray-600 hover:border-white"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
          <button
            onClick={() => changeColor("")}
            className="mt-2 px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm"
          >
            Reset Color
          </button>
        </div>

        {/* Scale Controls */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Scale</h3>
          <div className="flex gap-2">
            <button
              onClick={() => changeScale([0.5, 0.5, 0.5])}
              className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm"
            >
              Small
            </button>
            <button
              onClick={() => changeScale([1, 1, 1])}
              className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm"
            >
              Normal
            </button>
            <button
              onClick={() => changeScale([2, 2, 2])}
              className="px-3 py-1 bg-gray-700 hover:bg-gray-600 rounded text-sm"
            >
              Large
            </button>
          </div>
        </div>

        {/* Reset Button */}
        <button
          onClick={resetObject}
          className="w-full px-4 py-2 bg-red-600 hover:bg-red-700 rounded font-semibold"
        >
          Reset All
        </button>

        {/* Info */}
        <div className="mt-6 p-3 bg-gray-800 rounded text-sm">
          <p>
            <strong>Current:</strong> {currentObject}
          </p>
          <p>
            <strong>Color:</strong> {objectColor || "Default"}
          </p>
          <p>
            <strong>Scale:</strong> {objectScale.join(", ")}
          </p>
        </div>
      </div>

      {/* Main 3D Scene */}
      <div className="flex-1">
        <DynamicVoxelScene
          currentObject={currentObject}
          objectColor={objectColor}
          objectScale={objectScale}
          objectRotation={objectRotation}
        />
      </div>
    </div>
  );
}
