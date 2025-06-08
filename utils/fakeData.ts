import { faker } from "@faker-js/faker";
import { Product } from "../interfaces";

export const generateFakeProducts = () : Product[] => {
  return Array.from({ length: 25 }, (_, index) => {
    return {
      id: index + 1,
      title: faker.book.title(),
      price: +faker.commerce.price({ min: 100, max: 200, dec: 0 }),
      description: faker.commerce.productDescription(), // 'Featuring Phosphorus-enhanced technology, our Fish offers unparalleled Modern performance'
    };
  });
};
