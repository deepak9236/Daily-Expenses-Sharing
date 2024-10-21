import Expense from '../models/Expense.js';
import { validatePercentage } from '../utils/validatePercentage.js';
import mongoose from 'mongoose';

// Add a new expense
// Add a new expense
export const addExpense = async (req, res) => {
    const { description, totalAmount, splitMethod, participants } = req.body;
  
    try {
      if (splitMethod === 'percentage') {
        const valid = validatePercentage(participants);
        if (!valid) {
          return res.status(400).json({ error: 'Percentages must add up to 100%' });
        }
      }
  
      // Validate ObjectId format for each user
      for (const participant of participants) {
        if (!mongoose.Types.ObjectId.isValid(participant.user)) {
          return res.status(400).json({ error: `Invalid user ID: ${participant.user}` });
        }
      }
  
      const expense = new Expense({ description, totalAmount, splitMethod, participants });
      await expense.save();
      res.status(201).json(expense);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
// Retrieve all expenses of a user
export const getUserExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ 'participants.user': req.params.userId });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retrieve overall expenses
export const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Download balance sheet
export const downloadBalanceSheet = (req, res) => {
  res.json({ message: 'Balance sheet download is under development' });
};
