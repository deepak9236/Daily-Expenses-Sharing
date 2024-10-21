// models/Expense.js

import mongoose from 'mongoose';

const ParticipantSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    percentage: {
      type: Number,
      // Only required if the splitMethod is 'percentage'
      validate: {
        validator: function(value) {
          // Only require percentage if splitMethod is 'percentage'
          return this.parent().splitMethod !== 'percentage' || value !== undefined;
        },
        message: 'Percentage is required for percentage-based splits',
      },
    },
  });

const ExpenseSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  splitMethod: {
    type: String,
    enum: ['equal', 'exact', 'percentage'],
    required: true,
  },
  participants: [ParticipantSchema],
}, { timestamps: true });

const Expense = mongoose.model('Expense', ExpenseSchema);

export default Expense;
