import { OrderModel } from "data/model/OrderModel";
import { GetOrderUseCase } from "data/usecases/GetOrderUseCase";

interface OrderRepository {
    getOrders(page: number, limit: number): Promise<OrderModel>;
}


export class OrderRepositoryImpl implements OrderRepository {
    private readonly getOrderUseCase: GetOrderUseCase;
  
    constructor(getOrderUseCase: GetOrderUseCase) {
      this.getOrderUseCase = getOrderUseCase;
    }
  
    async getOrders(page: number, limit: number): Promise<OrderModel> {
      return this.getOrderUseCase.execute(page, limit);
    }
  }