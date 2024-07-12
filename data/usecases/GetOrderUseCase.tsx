import { OrderModel } from "data/model/OrderModel";

export interface GetOrderUseCase {
    execute(page: number, limit: number): Promise<OrderModel>;
}

export class GetOrderUseCaseImpl implements GetOrderUseCase {

    private readonly apiUrl = 'https://api.escuelajs.co/api/v1/products';

    async execute(page: number, limit: number): Promise<OrderModel> {
        const response = await fetch(`${this.apiUrl}?page=${page}&limit=${limit}&customer_name&order_date`);
        const data = await response.json();
        return data;
      }

}