import { Request, Response, NextFunction, RequestHandler } from "express";
import { sendSMS } from "../services/sms.service";
import { firestore } from "../services/firestore.service";
import { generateAccessCode } from "../utils/generateCode";

export const createNewAccessCode = async (req: Request, res: Response) => {
  try {
    const { phoneNumber } = req.body;
    // const code = generateAccessCode();
    //TODO: Hard otp for demo
    const code = '123456';
    const expiresAt = Date.now() + 5 * 60 * 1000;
    await firestore.collection("accessCodes").doc(phoneNumber).set({
      code,
      expiresAt,
    });
    // await sendSMS(phoneNumber, `Your access code is: ${code}`);
    res.status(200).json({ success: true, code });
  } catch (error) {
    res.status(404).json({ success: false, error });
  }
};

export const validateAccessCode = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { phoneNumber, accessCode } = req.body;
    const doc = await firestore
      .collection("accessCodes")
      .doc(phoneNumber)
      .get();
    const timeCheck = Date.now();
    if (doc.exists && doc.data()?.code === accessCode) {
      if (timeCheck >= doc.data()?.expiresAt) {
        res.status(403).json({ success: false, message: "Mã OTP hết hạn" });
        return;
      }
      await firestore
        .collection("accessCodes")
        .doc(phoneNumber)
        .set({ code: "", expiresAt: 0 });
      res.status(200).json({ success: true });
      return;
    }
    res.status(400).json({ success: false, message: 'Mã OTP sai!' });
  } catch (error) {
    res.status(400).json({ success: false, error });
    next(error);
  }
};

// In-memory OTP store (key: phoneNumber, value: { code, expiresAt })
const otpStore = new Map();

export const fakeCreateAccessCode = async (req: Request, res: Response) => {
  const { phoneNumber } = req.body;
  try {
    const code = generateAccessCode();
    const expiresAt = Date.now() + 5 * 60 * 1000;
    otpStore.set(phoneNumber, { code, expiresAt });
    await firestore.collection("accessCodes").doc(phoneNumber).set({ code });
    res.json({ success: true, status: "Pendding", code });
  } catch (error) {
    res.status(500).json({ success: false, status: "Request OTP failed" });
  }
};

export const fakeVerifyAccessCode = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { phoneNumber, code } = req.body;
  const record = otpStore.get(phoneNumber);

  try {
    if (!record) {
      res
        .status(400)
        .json({ success: false, message: "No OTP sent to this number" });
      return;
    }

    if (Date.now() > record.expiresAt) {
      otpStore.delete(phoneNumber);
      res.status(400).json({ success: false, message: "OTP expired" });
      return;
    }

    if (record.code !== code) {
      res.status(400).json({ success: false, message: "Incorrect OTP" });
      return;
    }

    // const doc = await firestore
    //   .collection("accessCodes")
    //   .doc(phoneNumber)
    //   .get();
    // if (doc.exists && doc.data()?.code === code) {
    //   console.log("Code đúng");
    // }
    // if (doc.exists && doc.data()?.code === code) {
    //   await firestore
    //     .collection("accessCodes")
    //     .doc(phoneNumber)
    //     .set({ code: "" });
    //   otpStore.delete(phoneNumber); // OTP chỉ dùng 1 lần
    //   res.status(200).json({ success: true, message: "Phone verified" });
    //   return;
    // }
    otpStore.delete(phoneNumber); // OTP chỉ dùng 1 lần
    res.status(200).json({ success: true, message: "Phone verified" });
    // res.status(400).json({ success: false, message: "Phone verify failed !" });
  } catch (error) {
    next(error);
  }
};
