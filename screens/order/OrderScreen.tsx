import { NavigationProp, useNavigation } from "@react-navigation/native";
import { OrderModel } from "data/model/OrderModel";
import { OrderRepository } from "data/repository/OrderRepository";
import { ProductRepository } from "data/repository/ProductRepository";
import { GetOrderUseCase } from "data/usecases/GetOrderUseCase";
import { GetProductUseCase } from "data/usecases/GetProductUseCase";
import { RootStackParamList } from "navigation/RootStackParamList";
import { useEffect, useState } from "react";
import { View } from "react-native";

const OrderScreen = () => {

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const productRepository = new ProductRepository(new GetProductUseCase());
  const orderRepository = new OrderRepository(new GetOrderUseCase());

  const [products, setProducts] = useState<OrderModel[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [hasMore, setHasMore] = useState(true);

  const fetchOrders = async () => {

    console.log("fetchOrders");

    setLoading(true);

    const order = await orderRepository.getOrders(page, limit);

    console.log('order response :', order);

    const product = await productRepository.getProduct();

    console.log('product response :', product);

    if (hasMore) {
    }

    setLoading(false);
  };

  useEffect(() => {
    console.log("useEffect");
    fetchOrders();
  }, [page, limit]);

  return <View></View>;
};

export default OrderScreen;
