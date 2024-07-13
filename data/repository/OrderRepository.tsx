import { OrderDetailModel } from "data/model/OrderDetailModel";
import { OrderModel } from "data/model/OrderModel";
import { GetOrderDetailUseCase} from "data/usecases/GetOrderDetailUseCase";
import { GetOrderUseCase } from "data/usecases/GetOrderUseCase";

interface OrderRepository {
  getOrders(page: number, limit: number): Promise<OrderModel>;
  getOrderDetail(id: string): Promise<OrderDetailModel>;
}

class OrderRepositoryImpl implements OrderRepository {

  private readonly getOrderUseCase: GetOrderUseCase;
  private readonly getOrderDetailUseCase: GetOrderDetailUseCase;

  constructor(getOrderUseCase: GetOrderUseCase, getOrderDetailUseCase: GetOrderDetailUseCase) {
    this.getOrderUseCase = getOrderUseCase;
    this.getOrderDetailUseCase = getOrderDetailUseCase;
  }

  getOrderDetail(id: string): Promise<OrderDetailModel> {
    return this.getOrderDetailUseCase.execute(id);
  }

  async getOrders(page: number, limit: number): Promise<OrderModel> {
    return this.getOrderUseCase.execute(page, limit);
  }


}


export { OrderRepositoryImpl as OrderRepository };