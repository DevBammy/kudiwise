// backend/routes/summaryRoutes.js
import express from 'express';
import { getSummary } from '../controllers/summaryController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getSummary);

export default router;
