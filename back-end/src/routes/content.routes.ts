import express from 'express';
import {
  generatePostCaptions,
  getPostIdeas,
  createCaptionsFromIdeas,
  saveGeneratedContent,
  getUserGeneratedContents,
  unSaveContent
} from '../controllers/content.controller';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/generate-captions', authenticateToken, generatePostCaptions);
router.post('/post-ideas', authenticateToken, getPostIdeas);
router.post('/captions-from-idea', authenticateToken, createCaptionsFromIdeas);
router.post('/save', authenticateToken, saveGeneratedContent);
router.get('/user-contents', authenticateToken, getUserGeneratedContents);
router.post('/unsave', authenticateToken, unSaveContent);

export default router;
