import { useRoute } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import ItemOrderProductDetail from "components/ItemOrderProductDetail";
import { OrderDetailModel, ProductOrderDetail } from "data/model/OrderDetailModel";
import { OrderRepository } from "data/repository/OrderRepository";
import { GetOrderDetailUseCase } from "data/usecases/GetOrderDetailUseCase";
import { GetOrderUseCase } from "data/usecases/GetOrderUseCase";
import {
  OrderDetailScreenProps,
  RootStackParamList,
} from "navigation/RootStackParamList";
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, ScrollView, Text, View, FlatList } from "react-native";
import containerstyle from "styles/containerstyle";
import textstyle from "styles/textstyle";

const OrderDetailScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {

  const route = useRoute<OrderDetailScreenProps>();
  const order = route.params;
  const orderRepository = new OrderRepository(new GetOrderUseCase(), new GetOrderDetailUseCase());

  const [orders, setOrder] = useState<OrderDetailModel>();
  const [products, setProducts] = useState<ProductOrderDetail[]>();
  const [isLoading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(String);

  const fetchOrderDetail = async () => {
    console.log("fetch Orders Detail");

    setLoading(true);

    const order = await orderRepository.getOrderDetail(orderId);
    setProducts(order.products)

    console.log("order response :", order);
    console.log("order product :", order.products);

    setOrder(order);

    setLoading(false);

  };

  useEffect(() => {
    console.log("useEffect");
    fetchOrderDetail();
    setOrderId(order.id)
  }, [orderId]);

  return (
    <SafeAreaView style={containerstyle.safearea}>
      <ScrollView style={{ paddingHorizontal: 16 }}>
        <View style={styles.container}>
          <Text style={styles.label}>Order ID</Text>
          <Text style={styles.text_value}>{order.id}</Text>
          <Text style={styles.label}>Customer Name</Text>
          <Text style={styles.text_value}>{order.customer_name}</Text>
          <Text style={styles.label}>Total Order Price</Text>
          <Text style={styles.text_value}>Rp {order.total_price}</Text>

          <Text
            style={[
              textstyle.TextParagraph1,
              { color: "#828282", marginTop: 24, marginBottom: 16 },
            ]}
          >
            Product Detail
          </Text>

          <FlatList
            data={products}
            renderItem={({ item }) => (
              <ItemOrderProductDetail
                product={item}
              />
            )}
            />

        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },

  label: {
    ...textstyle.TextParagraph1,
    marginTop: 16,
  },

  text_value: {
    ...textstyle.TextParagraph1Bold,
    marginTop: 8,
    fontSize: 20,
  },

});

export default OrderDetailScreen;
