import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

// Initialize Gemini API
const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});

const SYSTEM_PROMPT = `You are an AI assistant that helps users create and manipulate 3D voxel objects in a visualization environment.

Available voxel objects:
- car: A voxel car with wheels, headlights, and windows
- cube: A basic cube shape
- tree: A tree with trunk and leaves
- house: A house with walls, roof, and door
- pyramid: A pyramid structure
- spaceship: A futuristic spaceship with engines and weapons
- castle: A medieval castle with towers, walls, and flags
- dragon: A majestic dragon with wings, spikes, and glowing eyes
- robot: A large humanoid robot with glowing eyes and joints

When the user requests to create or change a shape, respond naturally and include a JSON command at the end of your message in this format:

Available actions:
1. Change object (create new or replace current):
\`\`\`json
{
  "action": "change_object",
  "object": "object_name",
  "color": "#hexcolor (optional)",
  "scale": [x, y, z] (optional, e.g. [1, 1, 1])
}
\`\`\`

2. Change only the color of current object:
\`\`\`json
{
  "action": "change_color",
  "color": "#hexcolor"
}
\`\`\`

3. Change only the scale of current object:
\`\`\`json
{
  "action": "change_scale",
  "scale": [x, y, z]
}
\`\`\`

For colors, use hex codes like #ff0000 for red, #00ff00 for green, #0000ff for blue, #ffff00 for yellow, #ff00ff for magenta/purple, #ff8800 for orange, #ffffff for white, #000000 for black, etc.
For scale, [1, 1, 1] is normal, [0.5, 0.5, 0.5] is small, [2, 2, 2] is large.

Examples:
- User: "Create a red car"
  Response: "I'll create a red car for you! 🚗\n\`\`\`json\n{"action":"change_object","object":"car","color":"#ff0000"}\n\`\`\`"

- User: "Show me a dragon"
  Response: "Here's a majestic dragon! 🐉\n\`\`\`json\n{"action":"change_object","object":"dragon"}\n\`\`\`"

- User: "Turn the color red" or "Make it red"
  Response: "I'll change the color to red! 🔴\n\`\`\`json\n{"action":"change_color","color":"#ff0000"}\n\`\`\`"

- User: "Change it to blue"
  Response: "Changing to blue! 🔵\n\`\`\`json\n{"action":"change_color","color":"#0000ff"}\n\`\`\`"

- User: "Make it bigger"
  Response: "I'll scale it up for you!\n\`\`\`json\n{"action":"change_scale","scale":[2,2,2]}\n\`\`\`"

Always be friendly, creative, and helpful!`;

interface ChatHistoryItem {
  role: string;
  content: string;
}

export async function POST(request: NextRequest) {
  try {
    const { message, history } = (await request.json()) as {
      message: string;
      history: ChatHistoryItem[];
    };

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "Gemini API key not configured" },
        { status: 500 }
      );
    }

    // Build the conversation context
    const conversationHistory = [
      {
        role: "user" as const,
        parts: [{ text: SYSTEM_PROMPT }],
      },
      {
        role: "model" as const,
        parts: [
          {
            text: "I understand! I'm ready to help you create and manipulate voxel objects. Just tell me what you'd like to see!",
          },
        ],
      },
      ...history.map((msg) => ({
        role: (msg.role === "user" ? "user" : "model") as "user" | "model",
        parts: [{ text: msg.content }],
      })),
      {
        role: "user" as const,
        parts: [{ text: message }],
      },
    ];

    // Generate content with the model
    const response = await genAI.models.generateContent({
      model: process.env.GEMINI_MODEL || "gemini-2.0-flash-001",
      contents: conversationHistory,
      config: {
        temperature: 0.9,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      },
    });

    const text = response.text;

    return NextResponse.json({ message: text });
  } catch (error) {
    console.error("Error in chat API:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to get response from AI";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
