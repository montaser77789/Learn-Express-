import { Product } from "../interfaces";
import { generateFakeProducts } from "../utils/fakeData";
// ** servies => Storage data

type productBody = {
  title: string;
  price: number;
  description: string;
};

export class ProductService {
  constructor(private product: Product[]) {
    this.product = product;
  }

  findAll(): Product[] {
    return this.product;
  }

  filterQuery(querParams: string): Product[] {
    if (querParams) {
      const filteredParams = querParams.split(",");

      let filteredProducts = [];
      filteredProducts = this.findAll().map((product) => {
        const filteredProduct: any = {};
        filteredParams.forEach((properity) => {
          if (product.hasOwnProperty(properity as keyof Product)) {
            filteredProduct[properity] = product[properity as keyof Product];
          }
        });
        console.log(filteredProduct);
        return { id: product.id, ...filteredProduct };
      });
      return filteredProducts;
    } else {
      return this.findAll();
    }
  }

  getProductById(productId: number) {
    return this.findAll().find((product) => product.id === productId);
  }

  createProduct(productBody: productBody) {
    return this.findAll().push({
      id: this.findAll().length + 1,
      ...productBody,
    });
  }

  updateProduct(productId: number, productBody: productBody) {
    const productIndex: number | undefined = this.findAll().findIndex(
      (product) => product.id === productId
    );

    if (productIndex !== -1) {
       (this.findAll()[productIndex] = {
        ...this.findAll()[productIndex],
        ...productBody,
      });
      return {message : "product updated successfaly ✅" }
    }else {
      return {message :  "Product not found !"}
    }
  }
  deleteProduct (productId : number){
      const productIndex: number | undefined = this.findAll().findIndex(
    (product) => product.id === productId
  );

  if (productIndex !== -1) {
    return   this.findAll().filter(
      (product) => product.id !== productId
    );
  }
  else{
    return {message : "Product not found !"}
  }
}
}
