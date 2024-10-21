import express from 'express';
import { addExpense, getUserExpenses, getAllExpenses, downloadBalanceSheet } from '../controllers/expenseController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';  // Import the auth middleware

const router = express.Router();

// Protected Routes (require JWT authentication)
router.post('/', authMiddleware, addExpense);
router.get('/user/:userId', authMiddleware, getUserExpenses);
router.get('/all', authMiddleware, getAllExpenses);
router.get('/download', authMiddleware, downloadBalanceSheet);

export default router;
