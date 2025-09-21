
# Gobi Craft

An AI-driven sandbox environment featuring flawlessly rendered objects in 3D space. 


## 📌 Phase 1 – Setup Basics

- Set up project with **React + Next.js**.  
- Install `three`, `@react-three/fiber`, `@react-three/drei` for 3D rendering.  
- Render a **single cube (voxel)** on screen as a placeholder object.  
- Add **OrbitControls** so you can rotate and move the camera.  

**✅ Goal:** See a basic voxel in your browser.  


## 📌 Phase 2 – Voxel Object Rendering

- Create a **VoxelObject component** that takes an array of voxels (`x, y, z, color`).  
- Render **simple voxel objects**, e.g., a small cube or a basic voxel “ball.”  
- Test **changing voxel colors** individually.  
- Experiment with **scaling and rotating** the voxel object.  

**✅ Goal:** Any object can be represented as a collection of voxels.  

## 📌 Phase 3 – Object Management

- Store multiple voxel objects (ball, car, tree, etc.) as **JSON or arrays**.  
- Implement **object swapping** by replacing voxel arrays.  
- Add ability to **scale**, **rotate**, and **recolor** voxel objects.  

**✅ Goal:** Dynamic voxel objects that can be swapped and modified.  

## 📌 Phase 4 – Chatbot Integration

- Add a **sidebar with chat input + display**.  
- Connect to **OpenAI API** (or preferred NLP).  
- Parse commands such as:  
  - `"turn into car"` → load car voxel array  
  - `"make it blue"` → recolor voxels  
  - `"make it bigger"` → scale voxel object  

**✅ Goal:** Control the voxel scene via text instead of buttons.  

## 📌 Phase 5 – Advanced Features

- Support **combined commands**:  
  - `"turn into a car and make it red"` → multiple actions.  
- Add **animations** (spin, bounce).  
- Allow **multiple voxel objects** in the scene.  
- (Optional) Add **physics** (gravity, collisions) using Rapier.js or cannon-es.  

**✅ Goal:** Fully interactive voxel sandbox.  

## 📌 Phase 6 – Polish

- Build a **clean UI layout** (Canvas + Chat sidebar).  
- Add **loading indicators** for large voxel objects.  
- Optimize performance: **use InstancedMesh** for many voxels.  
- (Optional) Deploy to **Vercel / Netlify** for online access.  

**✅ Goal:** A polished, shareable voxel sandbox app.  


## 🗂️ Project Roadmap Summary

1. Setup basics (React + Three.js)  
2. Render and manage voxel objects  
3. Modify voxel object properties (color, scale, rotation, animation)  
4. Chatbot integration (basic commands)  
5. Advanced features (combined commands, multiple objects, animations, optional physics)  
6. UI polish + deployment  


## 🔧 Recommended Stack

- **Rendering:** Three.js / react-three-fiber  
- **3D Objects:** Voxels stored as JSON arrays  
- **Chatbot:** OpenAI API for natural language commands  
- **Frontend Framework:** React / Next.js  
- **Performance:** InstancedMesh for large voxel objects  
- **Optional Physics:** Rapier.js or cannon-es


## Authors

- [@orchlon](https://www.github.com/orchlonn)
- [@munkhbayar](https://www.github.com/munkhbayar17)


## Support

For support, email ch.orchlon@gmail.com.

