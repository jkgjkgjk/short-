import { GoogleGenAI } from "@google/genai";
import { FormulaType, GeneratorOptions } from "../types";
import { SECOND_BRAIN_CONTEXT } from "../constants";

export const generateScriptWithGemini = async (
  apiKey: string,
  story: string,
  formula: FormulaType,
  options: GeneratorOptions
): Promise<string> => {
  if (!apiKey) throw new Error("API Key is missing");

  // Initialize the client dynamically with the user's key
  const ai = new GoogleGenAI({ apiKey });

  const prompt = `
You are a YouTube Shorts scriptwriting AI using a proven viral formula.

USER'S STORY:
${story}

SELECTED FORMULA: ${formula}

OPTIONS:
- Target Word Count: ${options.targetWordCount}
- Include Subscribe CTA: ${options.includeSubscribe}
- Strict Mode: ${options.strictMode}

YOUR TASK:
Generate a viral YouTube Short script following the Second Brain formula EXACTLY.

SECOND BRAIN CONTEXT:
${SECOND_BRAIN_CONTEXT}

INSTRUCTIONS:
1. Identify which formula fits best (or use the selected: ${formula})
2. Extract key facts from the user's story
3. Build hook (6-15 words, present tense)
4. Add context + rehook
5. Develop story progressively
6. End with payoff abruptly
7. Remove ALL commas except abbreviations
8. Ensure roughly ${options.targetWordCount} words total (Acceptable range: 79-155)
9. Validate against checklist. ${options.includeSubscribe ? 'MUST include a "so subscribe if..." style CTA.' : 'Do NOT include a CTA.'}

OUTPUT:
Return ONLY the final script text. No explanations, no commentary, just the script. Do not use markdown formatting like **bold**.
`;

  try {
    // Using gemini-3-pro-preview for complex instruction following.
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        temperature: 0.9,
        topK: 40,
        topP: 0.95,
        // maxOutputTokens removed to prevent thinking budget errors
      }
    });

    const text = response.text;
    if (!text) throw new Error("No text generated from Gemini API");
    
    return text.trim();
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};