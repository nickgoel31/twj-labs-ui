"use server";

import { generateReactCode } from "@/lib/component-factory";

// Get this from Wit.ai -> Settings -> Server Access Token
const WIT_TOKEN = process.env.WIT_SERVER_TOKEN; 

export async function generateComponentFromWit(prompt: string) {
  if (!prompt) return { success: false, error: "Empty prompt" };

  try {
    // 1. Ask Wit.ai to extract meaning
    // We URI encode the prompt to handle spaces safely
    const response = await fetch(`https://api.wit.ai/message?v=20240304&q=${encodeURIComponent(prompt)}`, {
      headers: {
        Authorization: `Bearer ${WIT_TOKEN}`,
      },
    });

    const data = await response.json();
    
    // 2. Parse the messy Wit.ai structure
    // Wit returns entities like: { "twj_component:twj_component": [ { value: "button", ... } ] }
    const entities = data.entities;
    
    // Helper to extract the value safely
    const getValue = (name: string) => {
        const entity = entities[name]; // Look for exact name
        if (entity && entity.length > 0) return entity[0].value;
        return null;
    };

    // Note: The entity names depend on how you named them in Wit. 
    // Usually they format as "role:name" or just "name". Check your API response to be sure.
    // Based on your screenshot, it will likely be "twj_component:twj_component"
    const compType = getValue("twj_component:twj_component");
    const theme = getValue("twj_theme:twj_theme") || "modern"; // Default to modern
    
    if (!compType) {
        return { success: false, error: "I couldn't figure out which component you wanted." };
    }

    // 3. Extract Label (Hack: Remove the known keywords from the prompt to find the "rest")
    // e.g. "Create brutalist button Hello World" -> remove "brutalist", "button" -> "Hello World"
    let label = prompt;
    label = label.replace(new RegExp(compType, "gi"), "");
    label = label.replace(new RegExp(theme, "gi"), "");
    label = label.replace(/(create|make|generate|a|an|with|text|that|says)/gi, ""); // Remove filler words
    label = label.trim();

    // 4. Generate Code
    const code = generateReactCode({
        type: compType.toLowerCase(),
        theme: theme.toLowerCase(),
        label: label
    });

    return { success: true, code };

  } catch (err) {
    console.error("Wit AI Error:", err);
    return { success: false, error: "Failed to connect to NLU service." };
  }
}