import { Request, Response, NextFunction, RequestHandler } from "express";
import { sendSMS } from "../services/sms.service";
import { firestore } from "../services/firestore.service";
import {
  createAccessToken,
  createRefreshToken,
  generateAccessCode,
  REFRESH_SECRET,
} from "../utils/generateCode";
import { RegisterPayload, UserPayload } from "../utils/type";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { hashPassword } from "../utils/hashPassword";

export const createNewAccessCode = async (req: Request, res: Response) => {
  try {
    const { phoneNumber } = req.body;
    // const code = generateAccessCode();
    //TODO: Hard otp for demo
    const code = "123456";
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
    res.status(400).json({ success: false, message: "Mã OTP sai!" });
  } catch (error) {
    res.status(400).json({ success: false, error });
    next(error);
  }
};

//API đăng ký user
export const register = async (req: Request, res: Response) => {
  try {
    const body: RegisterPayload = req.body;
    const fieldsSingnature = ["userName", "email", "phone"];
    const snapshots = await Promise.all(
      Object.keys(req.body)
        .filter((field: string) => fieldsSingnature.includes(field))
        .map((key) =>
          firestore
            .collection("user")
            .where(key, "==", req.body[key])
            .get()
            .then((snapshot) => ({ key, snapshot }))
        )
    );

    const fieldExits = snapshots
      .filter(({ snapshot }) => !snapshot.empty)
      .map(({ key }) => key);
    if (fieldExits.length > 0) {
      res
        .status(409)
        .json({ success: false, message: JSON.stringify(fieldExits) });
      return;
    }
    const password = await hashPassword(body.password);
    await firestore
      .collection("user")
      .add({ ...body, password });
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(404).json({ success: false, err });
  }
};

//API login
export const login = async (req: Request, res: Response) => {
  try {
    const user: UserPayload = { id: 1, username: "admin" };
    const accessToken = createAccessToken(user);
    const refreshToken = createRefreshToken(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/refresh-token",
    });
    res.json({ accessToken });
  } catch (err) {}
};

//API check refreshToken
export const checkRefreshToken = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) {
      res.sendStatus(401);
      return;
    }

    jwt.verify(token, REFRESH_SECRET, (err: VerifyErrors | null, user: any) => {
      if (err) {
        res.sendStatus(403);
        return;
      }
      const accessToken = createAccessToken({
        id: user.id,
        username: user.username,
      });
      res.json({ accessToken });
    });
  } catch (err) {
    res.sendStatus(400).json(err);
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("refreshToken", { path: "/refresh-token" });
  res.sendStatus(204);
};
