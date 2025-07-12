// backend/controllers/transactionController.js
import Transaction from '../models/Transaction.js';

export const addTransaction = async (req, res) => {
  try {
    const { title, amount, type, category, date } = req.body;
    const transaction = await Transaction.create({
      user: req.user.id,
      title,
      amount,
      type,
      category,
      date,
    });
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTransactions = async (req, res) => {
  const { type, category, startDate, endDate, minAmount, maxAmount } =
    req.query;

  const filters = { user: req.user._id };

  if (type) filters.type = type;
  if (category) filters.category = category;
  if (startDate || endDate) {
    filters.date = {};
    if (startDate) filters.date.$gte = new Date(startDate);
    if (endDate) filters.date.$lte = new Date(endDate);
  }
  if (minAmount || maxAmount) {
    filters.amount = {};
    if (minAmount) filters.amount.$gte = Number(minAmount);
    if (maxAmount) filters.amount.$lte = Number(maxAmount);
  }

  try {
    const transactions = await Transaction.find(filters).sort({
      createdAt: -1,
    });
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!transaction)
      return res.status(404).json({ message: 'Transaction not found' });
    res.status(200).json({ message: 'Transaction deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const { title, amount, type, category, date } = req.body;
    const updated = await Transaction.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { title, amount, type, category, date },
      { new: true }
    );
    if (!updated)
      return res.status(404).json({ message: 'Transaction not found' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
