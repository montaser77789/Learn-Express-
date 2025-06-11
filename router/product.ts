import { Router } from "express";
import { generateFakeProducts } from "../utils/fakeData";
import { ProductService } from "../services/ProductService";
import ProductController from "../controllers/productController";

const productRouter = Router();

const fakeProduct = generateFakeProducts();
const productService = new ProductService(fakeProduct);

const {
  getProduct,
  createProduct,
  updateProduct,
  getProductById,
  deleteProduct,
} = new ProductController(productService);

productRouter.route("/").get(getProduct).post(createProduct);

productRouter
  .route("/:id")
  .patch(updateProduct)
  .get(getProductById)
  .delete(deleteProduct);

export default productRouter;
