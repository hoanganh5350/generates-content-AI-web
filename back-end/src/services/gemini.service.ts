import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateText = async (prompt: string): Promise<string[]> => {
  try {
    const result = await model.generateContent(prompt);
    const text =
      result.response.candidates?.[0]?.content?.parts?.[0]?.text || "";
    return text.split("\n").filter(Boolean);
  } catch (error) {
    return ["Error AI"];
  }
};
