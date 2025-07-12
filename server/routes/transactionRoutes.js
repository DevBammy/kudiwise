// backend/routes/transactionRoutes.js
import express from 'express';
import {
  addTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
} from '../controllers/transactionController.js';

import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.get('/', getTransactions);
router.post('/', addTransaction);
router.put('/:id', updateTransaction);
router.delete('/:id', deleteTransaction);

export default router;
