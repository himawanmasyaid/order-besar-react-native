import { BASE_URL } from "data/Constants";
import { OrderModel } from "data/model/OrderModel";

interface GetOrderUseCase {
    execute(page: number, limit: number): Promise<OrderModel>;
}

class GetOrderUseCaseImpl implements GetOrderUseCase {

    async execute(page: number, limit: number): Promise<OrderModel> {
        const response = await fetch(`${BASE_URL}orders?page=${page}&limit=${limit}&customer_name&order_date`);
        const data = await response.json();
        return data;
      }

}

export { GetOrderUseCaseImpl as GetOrderUseCase };