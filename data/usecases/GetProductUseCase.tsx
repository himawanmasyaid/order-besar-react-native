import { BASE_URL } from "data/Constants";
import { ProductModel } from "data/model/ProductModel";

interface GetProductUseCase {
  execute(): Promise<ProductModel>;
}

class GetProductUseCaseImpl implements GetProductUseCase {

  async execute(): Promise<ProductModel> {
    const response = await fetch(`${BASE_URL}products`);
    const data = await response.json();
    return data;
  }
  
}

export { GetProductUseCaseImpl as GetProductUseCase };