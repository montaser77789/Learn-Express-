import { Product } from "../interfaces";

class ProductController {
  product: Product[];
  constructor(product: Product[]) {
    this.product = product;
  }

  getProduct() {
    return this.product;
  }
}

export default ProductController;
