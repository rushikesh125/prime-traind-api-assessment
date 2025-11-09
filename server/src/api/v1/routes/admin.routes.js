// src/api/v1/routes/admin.routes.js
import { Router } from 'express';
import { protect } from '../../../middlewares/auth.middleware.js';
import { restrictTo } from '../../../middlewares/role.middleware.js';
import { deleteAnyProduct, deleteUser, getAllProductsAdmin, getAllUsers, getUser, updateUser } from '../controllers/admin.controller.js';


const adminRouter = Router();

adminRouter.use(protect);
adminRouter.use(restrictTo('admin')); // ALL routes below require admin

// User Management
adminRouter.get('/users', getAllUsers);
adminRouter.get('/users/:id', getUser);
adminRouter.patch('/users/:id', updateUser);
adminRouter.delete('/users/:id', deleteUser);

// Product Management (Admin)
adminRouter.get('/products', getAllProductsAdmin);
adminRouter.delete('/products/:id', deleteAnyProduct);

export default adminRouter;