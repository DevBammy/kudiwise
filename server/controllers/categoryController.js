// backend/controllers/categoryController.js
import Category from '../models/Category.js';

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({
      $or: [{ isDefault: true }, { user: req.user._id }],
    }).sort({ type: 1, name: 1 });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createCategory = async (req, res) => {
  const { name, type } = req.body;
  if (!name || !type) {
    return res.status(400).json({ message: 'Name and type are required' });
  }

  try {
    const exists = await Category.findOne({ name, type, user: req.user._id });
    if (exists)
      return res.status(400).json({ message: 'Category already exists' });

    const category = await Category.create({
      name,
      type,
      user: req.user._id,
      isDefault: false,
    });

    res.status(201).json(category);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!category)
      return res.status(404).json({ message: 'Category not found' });
    res.status(200).json({ message: 'Category deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
