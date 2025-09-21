
# Gobi Craft

An AI-driven sandbox environment featuring flawlessly rendered objects in 3D space. 



## 📌 Phase 1 – Setup Basics 1

- Set up project with React + Vite/Next.js (or vanilla if you prefer).

- Install three, @react-three/fiber, @react-three/drei for 3D rendering.

- Render a simple 3D sphere on screen (placeholder object).

- Add OrbitControls so you can move around with the mouse.

- #### ✅ Goal: See a basic 3D object in your browser.


## 📌 Phase 2 – Multiple Objects

- Learn to load .glb / .gltf models using useGLTF or GLTFLoader.

- Store a few test models (car.glb, basketball.glb, chair.glb).

- Create a function to swap objects in the scene.

- Add buttons like “Load Car,” “Load Ball” to test.

- #### ✅ Goal: Be able to switch between objects manually.


## 📌 Phase 3 – Object Properties

- Add ability to change object color.

- Add ability to scale (make bigger/smaller).

- Add ability to rotate or animate objects.

- #### ✅ Goal: Modify the object interactively.


## 📌 Phase 4 – Chatbot Integration

- Add a sidebar with a chat input + display.

- Connect to OpenAI API (or your preferred NLP).

- Parse commands like:

- "turn into car" → setModel("/models/car.glb")

- "make it blue" → setColor("blue")

- "make it bigger" → setScale(2)

- #### ✅ Goal: Control the 3D scene via text instead of buttons


## 📌 Phase 5 – Advanced Commands

- Support combined commands:
- "turn into a car and make it red" → two actions.

- Add animations (e.g., spin, bounce).

- Add multiple objects (spawn more than one).

- Add basic physics (falling, collisions).

- #### ✅ Goal: More natural sandbox interaction.


## 📌 Phase 6 – Polish

- Build a clean UI layout (Canvas + Chat sidebar).

- Add loading indicators for models.

- Optimize performance (limit poly count, lazy load models).

- (Optional) Deploy to Vercel/Netlify so people can play with it online.

- #### ✅ Goal: A polished, shareable sandbox app.

## 🗂️ Project Roadmap Summary

- Setup basics (React + Three.js)

- Load and swap models

- Modify object properties (color, scale, animation)

- Chatbot integration (basic commands)

- Advanced chatbot features (combined commands, multiple objects)

- UI polish + deployment



## Authors

- [@orchlon](https://www.github.com/orchlonn)
- [@munkhbayar](https://www.github.com/munkhbayar17)


## Support

For support, email ch.orchlon@gmail.com.

