// src/api/v1/controllers/admin.controller.js
import User from '../../../models/User.model.js';
import Product from '../../../models/Product.model.js';
import { sendResponse } from '../../../utils/response.js';
import { z } from 'zod';

// --- USER MANAGEMENT ---
const updateUserSchema = z.object({
  name: z.string().optional(),
  email: z.string().email().optional(),
  role: z.enum(['user', 'admin']).optional(),
});

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    sendResponse(res, 200, true, 'All users fetched', users);
  } catch (err) {
    sendResponse(res, 500, false, err.message);
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return sendResponse(res, 404, false, 'User not found');
    sendResponse(res, 200, true, 'User fetched', user);
  } catch (err) {
    sendResponse(res, 500, false, err.message);
  }
};

export const updateUser = async (req, res) => {
  try {
    const data = updateUserSchema.parse(req.body);
    const user = await User.findByIdAndUpdate(req.params.id, data, {
      new: true,
      runValidators: true,
    }).select('-password');

    if (!user) return sendResponse(res, 404, false, 'User not found');
    sendResponse(res, 200, true, 'User updated', user);
  } catch (err) {
    if (err.name === 'ZodError') {
      const msg = err.errors.map(e => e.message).join(', ');
      return sendResponse(res, 400, false, msg);
    }
    sendResponse(res, 500, false, err.message);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return sendResponse(res, 404, false, 'User not found');

    // Optional: Delete user's products
    await Product.deleteMany({ user: req.params.id });

    sendResponse(res, 200, true, 'User and their products deleted');
  } catch (err) {
    sendResponse(res, 500, false, err.message);
  }
};

// --- PRODUCT MANAGEMENT (Admin sees ALL) ---
export const getAllProductsAdmin = async (req, res) => {
  try {
    const products = await Product.find().populate('user', 'name email');
    sendResponse(res, 200, true, 'All products fetched', products);
  } catch (err) {
    sendResponse(res, 500, false, err.message);
  }
};

export const deleteAnyProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return sendResponse(res, 404, false, 'Product not found');
    sendResponse(res, 200, true, 'Product deleted (admin)');
  } catch (err) {
    sendResponse(res, 500, false, err.message);
  }
};