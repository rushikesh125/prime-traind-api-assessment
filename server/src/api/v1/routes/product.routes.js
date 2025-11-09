import {Router} from "express"
import { protect } from "../../../middlewares/auth.middleware.js"
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from "../controllers/product.controller.js"



const productRouter = Router()

productRouter.use(protect)

productRouter.route('/').get(getProducts).post(createProduct);

productRouter.route('/:id').get(getProduct).patch(updateProduct).delete(deleteProduct)


export default productRouter;