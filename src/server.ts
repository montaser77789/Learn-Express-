import express from "express";
import { generateFakeProducts } from "./utils/fakeData";
import { Product } from "./interfaces";
const app = express();

const DUMMY_product = generateFakeProducts();

app.get("/products", (req, res) => {
  const querParams = req.query.filter as string;

  if (querParams) {
    const filteredParams = querParams.split(",");

    let filteredProducts = [];
    filteredProducts = DUMMY_product.map((product) => {
      const filteredProduct: any = {};
      filteredParams.forEach((properity) => {
        if (product.hasOwnProperty(properity as keyof Product)) {
          filteredProduct[properity] = product[properity as keyof Product];
        }
      });
      console.log(filteredProduct);
      return { id: product.id, ...filteredProduct };
    });
    res.send(filteredProducts);
  }

  res.send(DUMMY_product);
});
app.get("/products/:id", (req, res) => {
  const PRODUCT_ID = +req.params.id;

  if (isNaN(PRODUCT_ID)) {
    res.status(404).send({ message: "Invalid product ID" });
  } else {
    const product:
      | { id: number; title: string; price: number; description: string }
      | undefined = DUMMY_product.find((product) => product.id === PRODUCT_ID);

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

const PORT: number = 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
