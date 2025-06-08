import express from "express";
const app = express();
import path from "path";
import { generateFakeProducts } from "./utils/fakeData";
import { ProductService } from "./services/ProductService";
import ProductController from "./controllers/productController";

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

const fakeProduct = generateFakeProducts();
const productService = new ProductService(fakeProduct);

const productController = new ProductController(productService);

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/products", (req, res) => {
  res.render("products");
});

app.get("/api/products", (req, res) => productController.getProduct(req, res));

app.get("/api/products/:id", (req, res) =>
  productController.getProductById(req, res)
);

app.post("/api/products", (req, res) =>
  productController.createProduct(req, res)
);
// ** update Product using patch
app.patch("/api/products/:id", (req, res) =>
  productController.updateProduct(req, res)
);
// ** DELETE Product
app.delete("/api/products/:id", (req, res) =>
  productController.deleteProduct(req, res)
);

const PORT: number = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
