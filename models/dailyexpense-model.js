const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  category: {
    type: String,
    required: true,
    enum: [
      'Food & Dining', 'Transportation', 'Utilities', 'Rent/Mortgage', 
      'Groceries', 'Entertainment', 'Health & Fitness', 'Education', 
      'Shopping', 'Insurance', 'Savings & Investment', 'Others'
    ],
  },
  description: { type: String },
  amount: { type: Number, required: true },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['credit card', 'debit card', 'upi', 'cash', 'loan'],
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'organizemeusers', required: true },
});

module.exports = mongoose.model('Expense', expenseSchema);