// backend/controllers/summaryController.js
import Transaction from '../models/Transaction.js';
import mongoose from 'mongoose';

export const getSummary = async (req, res) => {
  const { groupBy = 'month', startDate, endDate } = req.query;

  // Supported groupings
  const groupFormats = {
    day: '%Y-%m-%d',
    week: '%Y-%U',
    month: '%Y-%m',
  };

  if (!groupFormats[groupBy]) {
    return res.status(400).json({ message: 'Invalid groupBy value' });
  }

  // Build match stage
  const match = { user: new mongoose.Types.ObjectId(req.user._id) };

  if (startDate || endDate) {
    match.date = {};
    if (startDate) match.date.$gte = new Date(startDate);
    if (endDate) match.date.$lte = new Date(endDate);
  }

  try {
    const summary = await Transaction.aggregate([
      { $match: match },
      {
        $group: {
          _id: {
            period: {
              $dateToString: { format: groupFormats[groupBy], date: '$date' },
            },
            type: '$type',
          },
          total: { $sum: '$amount' },
        },
      },
      {
        $group: {
          _id: '$_id.period',
          income: {
            $sum: {
              $cond: [{ $eq: ['$_id.type', 'income'] }, '$total', 0],
            },
          },
          expense: {
            $sum: {
              $cond: [{ $eq: ['$_id.type', 'expense'] }, '$total', 0],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          period: '$_id',
          income: 1,
          expense: 1,
          balance: { $subtract: ['$income', '$expense'] },
        },
      },
      { $sort: { period: 1 } },
    ]);

    res.status(200).json(summary);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
