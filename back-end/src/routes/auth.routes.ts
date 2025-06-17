import express from "express";
import {
  checkRefreshToken,
  createNewAccessCode,
  register,
  login,
  logout,
  validateAccessCode,
} from "../controllers/auth.controller";

const router = express.Router();

router.post("/create-code", createNewAccessCode);
router.post("/validate-code", validateAccessCode);

router.post("/register", register)
router.post("/login", login);
router.post("/refresh-token", checkRefreshToken);
router.post("/logout", logout);

export default router;
