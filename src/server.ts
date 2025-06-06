import express from "express";
import { generateFakeProducts } from "./utils/fakeData";
import { Product } from "./interfaces";
import ProductController from "./controllers/productController";
import { ProductService } from "./services/ProductService";
const app = express();

app.use(express.json());



const fakeProduct = generateFakeProducts();
const productService = new ProductService(fakeProduct);

const productController = new ProductController(productService);

app.get("/products", (req, res) => {
  res.send(productController.getProduct());

  // const querParams = req.query.filter as string;

  // if (querParams) {
  //   const filteredParams = querParams.split(",");

  //   let filteredProducts = [];
  //   filteredProducts = fakeProduct.map((product) => {
  //     const filteredProduct: any = {};
  //     filteredParams.forEach((properity) => {
  //       if (product.hasOwnProperty(properity as keyof Product)) {
  //         filteredProduct[properity] = product[properity as keyof Product];
  //       }
  //     });
  //     console.log(filteredProduct);
  //     return { id: product.id, ...filteredProduct };
  //   });
  //   res.send(filteredProducts);
  // }

  // res.send(fakeProduct);
});

app.get("/products/:id", (req, res) => {
  const PRODUCT_ID = +req.params.id;

  if (isNaN(PRODUCT_ID)) {
    res.status(404).send({ message: "Invalid product ID" });
  } else {
    const product:
      | { id: number; title: string; price: number; description: string }
      | undefined = fakeProduct.find((product) => product.id === PRODUCT_ID);

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
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/products", (req, res) => {
  console.log(req.body);

  const newProduct = req.body;

  fakeProduct.push({ id: fakeProduct.length + 1, ...newProduct });

  res.send({
    id: fakeProduct.length + 1,
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
  });
});

// ** update Product using patch

app.patch("/products/:id", (req, res) => {
  const productId = +req.params.id;
  const productBody = req.body;
  if (isNaN(productId)) {
    res.status(404).send({ message: "this is invalid id !" });
    return;
  }

  const productIndex: number | undefined = fakeProduct.findIndex(
    (product) => product.id === productId
  );

  if (productIndex !== -1) {
    fakeProduct[productIndex] = {
      ...fakeProduct[productIndex],
      ...productBody,
    };
    res.status(201).send({ message: "product updated successfaly ✅" });
  } else {
    res.status(404).send({ message: "Product not found !" });
  }

  console.log(productIndex);
});

// ** DELETE Product

app.delete("/products/:id", (req, res) => {
  const productId = +req.params.id;
  if (isNaN(productId)) {
    res.status(404).send({ message: "Product not found !" });
    return;
  }

  const productIndex: number | undefined = fakeProduct.findIndex(
    (product) => product.id === productId
  );

  if (productIndex !== -1) {
    const filterProduct = fakeProduct.filter(
      (product) => product.id !== productId
    );
    res.status(200).send(filterProduct);
  } else {
    res.status(404).send({ message: "Product not found !" });
  }
});

const PORT: number = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
