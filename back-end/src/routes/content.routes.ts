import express from 'express';
import {
  generatePostCaptions,
  getPostIdeas,
  createCaptionsFromIdeas,
  saveGeneratedContent,
  getUserGeneratedContents,
  unSaveContent
} from '../controllers/content.controller';

const router = express.Router();

router.post('/generate-captions', generatePostCaptions);
router.post('/post-ideas', getPostIdeas);
router.post('/captions-from-idea', createCaptionsFromIdeas);
router.post('/save', saveGeneratedContent);
router.get('/user-contents', getUserGeneratedContents);
router.post('/unsave', unSaveContent);

export default router;
