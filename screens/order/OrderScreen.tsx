import { NavigationProp, useNavigation } from "@react-navigation/native";
import ItemOrder from "components/ItemOrder";
import { Order, OrderModel } from "data/model/OrderModel";
import { OrderRepository } from "data/repository/OrderRepository";
import { ProductRepository } from "data/repository/ProductRepository";
import { GetOrderUseCase } from "data/usecases/GetOrderUseCase";
import { GetProductUseCase } from "data/usecases/GetProductUseCase";
import { RootStackParamList } from "navigation/RootStackParamList";
import { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import containerstyle from "styles/containerstyle";

const OrderScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const orderRepository = new OrderRepository(new GetOrderUseCase());

  const [orders, setOrder] = useState<Order[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isHasMore, setHasMore] = useState(true);

  const fetchOrders = async () => {
    console.log("fetchOrders");

    setLoading(true);

    const order = await orderRepository.getOrders(page, limit);

    console.log("order response :", order);

    setOrder(order.list)

    setLoading(false);
  };

  useEffect(() => {
    console.log("useEffect");
    fetchOrders();
  }, [page, limit]);

  return (
    <SafeAreaView style={containerstyle.safearea}>
      <View style={styles.container}>

      <FlatList
        data={orders}
        renderItem={({ item }) => (
          <ItemOrder
            order={item}
            onEditPress={() => navigation.navigate('order_edit', item) }
            onDetailPress={() => navigation.navigate('order_detail', item)}
            onDeletePress={() => console.log("delete press") }
          />
        )}
        keyExtractor={(item) => item.id}
      />

      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
})

export default OrderScreen;
