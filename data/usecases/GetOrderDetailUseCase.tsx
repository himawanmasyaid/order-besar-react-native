import { BASE_URL } from "data/Constants";
import { OrderDetailModel } from "data/model/OrderDetailModel";

interface GetOrderDetailUseCase {
  execute(id: string): Promise<OrderDetailModel>;
}

class GetOrderDetailUseCaseImpl implements GetOrderDetailUseCase {
  async execute(id: string): Promise<OrderDetailModel> {
    const response = await fetch(`${BASE_URL}order/${id}`);
    const data = await response.json();
    return data;
  }
}

export { GetOrderDetailUseCaseImpl as GetOrderDetailUseCase };
