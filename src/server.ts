import express from "express";
import { generateFakeProducts } from "./utils/fakeData";
import { Product } from "./interfaces";
import ProductController from "./controllers/productController";
import { ProductService } from "./services/ProductService";
const app = express();

app.use(express.json());
app.set('view engine', 'pug')

const fakeProduct = generateFakeProducts();
const productService = new ProductService(fakeProduct);

const productController = new ProductController(productService);

app.get('/', (req, res) => {
  res.render('index')
})



app.get("/products", (req, res) => {
  productController.getProduct(req, res);
});

app.get("/products/:id", (req, res) => {
  productController.getProductById(req, res);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/products", (req, res) => {
  productController.createProduct(req, res);
});

// ** update Product using patch

app.patch("/products/:id", (req, res) => {
  productController.updateProduct(req, res);
});

// ** DELETE Product

app.delete("/products/:id", (req, res) => {
  productController.deleteProduct(req, res);
});

const PORT: number = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
