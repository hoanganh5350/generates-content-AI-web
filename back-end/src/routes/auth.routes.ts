import express from 'express';
import { createNewAccessCode, validateAccessCode, fakeCreateAccessCode, fakeVerifyAccessCode } from '../controllers/auth.controller';

const router = express.Router();

router.post('/create-code', createNewAccessCode);
router.post('/validate-code', validateAccessCode);

export default router;