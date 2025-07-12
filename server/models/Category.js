// backend/models/Category.js
import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    name: { type: String, required: true },
    type: { type: String, enum: ['income', 'expense'], required: true },
    isDefault: { type: Boolean, default: false }, // true for app-wide defaults
  },
  { timestamps: true }
);

const Category = mongoose.model('Category', categorySchema);
export default Category;
