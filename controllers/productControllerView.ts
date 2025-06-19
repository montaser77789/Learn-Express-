import { Request, Response } from "express";
import { ProductService } from "../services/ProductService";

export default class ProductControllerView {
  constructor(private productServices: ProductService) {
    this.renderProduct = this.renderProduct.bind(this);
    this.renderProductPage = this.renderProductPage.bind(this);
  }
  renderProduct(req: Request, res: Response) {
    res.render("products", {
      productTitle: "Prodct Title PAge ",
      products: this.productServices.findAll(),
    });
  }
  renderProductPage(req: Request, res: Response) {
    const PRODUCT_ID = +req.params.id;

    res.render("singleProduct", {
      product: this.productServices.getProductById(PRODUCT_ID),
    });
  }
}
