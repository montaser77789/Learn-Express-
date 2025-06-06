import { Product } from "../interfaces";
import { generateFakeProducts } from "../utils/fakeData";
// ** servies => Storage data
const fakeProduct = generateFakeProducts();

export class ProductService {

  constructor(private product: Product[]){
    this.product= product
  }

  findAll (): Product[]{
    return this.product
  }
}
