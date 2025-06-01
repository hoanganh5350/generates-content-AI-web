import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const model = genAI.getGenerativeModel({ model: 'models/gemini-pro' });

export const generateText = async (prompt: string): Promise<string[]> => {
  const result = await model.generateContent({
    contents: [{ role: 'user', parts: [{ text: prompt }] }]
  });

  const text = result.response.candidates?.[0]?.content?.parts?.[0]?.text || '';
  return text.split('\n').filter(Boolean);
};
