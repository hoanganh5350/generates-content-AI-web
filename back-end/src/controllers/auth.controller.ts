import { Request, Response, NextFunction, RequestHandler } from 'express';
import { sendSMS } from '../services/sms.service';
import { firestore } from '../services/firestore.service';
import { generateAccessCode } from '../utils/generateCode';

export const createNewAccessCode = async (req: Request, res: Response) => {
  const { phoneNumber } = req.body;
  const code = generateAccessCode();
  await firestore.collection('accessCodes').doc(phoneNumber).set({ code });
  await sendSMS(phoneNumber, `Your access code is: ${code}`);
  res.json({ accessCode: code });
};

export const validateAccessCode = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { phoneNumber, accessCode } = req.body;
    const doc = await firestore.collection('accessCodes').doc(phoneNumber).get();
    if (doc.exists && doc.data()?.code === accessCode) {
      await firestore.collection('accessCodes').doc(phoneNumber).set({ code: '' });
      res.json({ success: true });
      return; // kết thúc hàm, KHÔNG return res.json(...)
    }
    res.status(400).json({ success: false });
  } catch (error) {
    next(error); // gọi middleware lỗi Express
  }
};
