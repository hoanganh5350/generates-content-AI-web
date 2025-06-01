import { Request, Response } from 'express';
import { generateText } from '../services/gemini.service';
import { firestore } from '../services/firestore.service';

export const generatePostCaptions = async (req: Request, res: Response) => {
  const { socialNetwork, subject, tone } = req.body;
  const prompt = `Generate captions for ${socialNetwork} about ${subject} with a ${tone} tone.`;
  const captions = await generateText(prompt);
  res.json(captions);
};

export const getPostIdeas = async (req: Request, res: Response) => {
  const { topic } = req.body;
  const ideas = await generateText(`Generate creative post ideas about: ${topic}`);
  res.json(ideas);
};

export const createCaptionsFromIdeas = async (req: Request, res: Response) => {
  const { idea } = req.body;
  const captions = await generateText(`Generate engaging captions based on the idea: ${idea}`);
  res.json(captions);
};

export const saveGeneratedContent = async (req: Request, res: Response) => {
  const { topic, data, phoneNumber } = req.body;
  await firestore.collection('userContents').add({ phoneNumber, topic, data, createdAt: new Date() });
  res.json({ success: true });
};

export const getUserGeneratedContents = async (req: Request, res: Response) => {
  const { phone_number } = req.query;
  const snapshot = await firestore.collection('userContents').where('phoneNumber', '==', phone_number).get();
  const contents = snapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }));
  res.json(contents);
};

export const unSaveContent = async (req: Request, res: Response) => {
  const { captionId } = req.body;
  await firestore.collection('userContents').doc(captionId).delete();
  res.json({ success: true });
};