import { Product } from "../interfaces";
import { ProductService } from "../services/ProductService";

class ProductController {
  constructor(private productServices: ProductService) {}

  getProduct() {
    return this.productServices.findAll();
  }
}

export default ProductController;
