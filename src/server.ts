import express from "express";
const app = express();

const PORT: number = 5000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const DUMMY_product = [
  {
    id: 1,
    name: "Product 1",
  },
  {
    id: 2,
    name: "Product 2",
  },
];

app.get("/products", (req, res) => {
  res.send(DUMMY_product);
});
app.get("/product/:id", (req, res) => {
  console.log(req.params);
  const PRODUCT_ID = +req.params.id;

  if (isNaN(PRODUCT_ID)) {
    res.status(404).send({ message: "Invalid product ID" });
  } else {
    const product = DUMMY_product.find((product) => product.id === PRODUCT_ID);

    if (product) {
      res.send({
        id: PRODUCT_ID,
        name: product.name,
      });

    } else {

      res.status(404).send({ message: "Product not founf !" });
      
    }
  }
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
