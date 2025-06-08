import { Request, Response } from "express";
import { ProductService } from "../services/ProductService";

class ProductController {
  constructor(private productServices: ProductService) {}

  getProduct(req: Request, res: Response) {
    const querParams = req.query.filter as string;
    if (querParams) {
      res.send(this.productServices.filterQuery(querParams));
    }
    res.send(this.productServices.findAll());
  }

  getProductById(req: Request, res: Response) {
    const PRODUCT_ID = +req.params.id;

    if (isNaN(PRODUCT_ID)) {
      res.status(404).send({ message: "Invalid product ID" });
    } else {
      const product:
        | { id: number; title: string; price: number; description: string }
        | undefined = this.productServices.getProductById(PRODUCT_ID);

      if (product) {
        res.send({
          id: PRODUCT_ID,
          title: product.title,
          price: product.price,
          description: product.description,
        });
      } else {
        res.status(404).send({ message: "Product not founf !" });
      }
    }
  }

  createProduct(req: Request, res: Response) {
    const productBody = req.body;

    this.productServices.createProduct(productBody);

    res.send({
      id: this.productServices.findAll().length + 1,
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
    });
  }

  updateProduct(req: Request, res: Response) {
    const productId = +req.params.id;
    const productBody = req.body;
    if (isNaN(productId)) {
      res.status(404).send({ message: "this is invalid id !" });
      return;
    }

    const message = this.productServices.updateProduct(productId, productBody);

    res.status(201).send(message);
  }
  deleteProduct(req: Request, res: Response) {
    const productId = +req.params.id;
    if (isNaN(productId)) {
      res.status(404).send({ message: "Product not found !" });
      return;
    }

    const filterProduct = this.productServices.deleteProduct(productId);

    if (filterProduct) {
      res.status(200).send(filterProduct);
    } else {
      res.status(404).send(filterProduct);
    }
  }
}

export default ProductController;
