import { ProductModel } from "data/model/ProductModel";
import { GetProductUseCase } from "data/usecases/GetProductUseCase";

interface ProductDataSource {
  getProduct(): Promise<ProductModel>;
}

export class ProductRepository implements ProductDataSource {

  private readonly getProductUseCase: GetProductUseCase;

  constructor(getProductUseCase: GetProductUseCase) {
    this.getProductUseCase = getProductUseCase;
  }

  async getProduct(): Promise<ProductModel> {
    return this.getProductUseCase.execute();
  }
}
