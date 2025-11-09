import Product from "../../../models/Product.model.js";
import { sendResponse } from "../../../utils/response.js";
import { createProductSchema, updateProductSchema } from "../../../utils/validate.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    sendResponse(res, 200, true, "Product fetched", products);
  } catch (error) {
    sendResponse(res, 500, false, error.message);
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!product) {
      return sendResponse(res, 404, false, "Product not found");
    }
    sendResponse(res, 200, true, "Product Fetched", product);
  } catch (error) {
    sendResponse(res, 500, false, error.message);
  }
};

export const createProduct = async (req, res) => {
  try {
    const data = createProductSchema.parse(req.body);
    const product = await Product.create({ ...data, user: req.user._id });
    sendResponse(res, 201, true, "Product created", product);
  } catch (error) {
    if (err.name === "ZodError") {
      const msg = err.errors.map((e) => e.message).join(", ");
      return sendResponse(res, 400, false, msg);
    }
    sendResponse(res, 500, false, err.message);
  }
}


export const updateProduct = async (req, res) => {
  try {
    const data = updateProductSchema.parse(req.body);

    const product = await Product.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      data,
      { new: true, runValidators: true }
    );

    if (!product) {
      return sendResponse(res, 404, false, 'Product not found or not owned');
    }

    sendResponse(res, 200, true, 'Product updated', product);
  } catch (err) {
    if (err.name === 'ZodError') {
      const msg = err.errors.map(e => e.message).join(', ');
      return sendResponse(res, 400, false, msg);
    }
    sendResponse(res, 500, false, err.message);
  }
};



export const deleteProduct = async (req, res) => {
  try {
    const query = req.user.role === 'admin'
      ? { _id: req.params.id }
      : { _id: req.params.id, user: req.user._id };

    const product = await Product.findOneAndDelete(query);

    if (!product) {
      return sendResponse(res, 404, false, 'Product not found or not authorized');
    }

    sendResponse(res, 200, true, 'Product deleted');
  } catch (err) {
    sendResponse(res, 500, false, err.message);
  }
};
