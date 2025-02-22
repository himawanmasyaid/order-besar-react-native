import { useRoute } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import ItemOrderProductDetail from "components/ItemOrderProductDetail";
import {
  OrderDetailModel,
  ProductOrderDetail,
} from "data/model/OrderDetailModel";
import { OrderRepository } from "data/repository/OrderRepository";
import { GetOrderDetailUseCase } from "data/usecases/GetOrderDetailUseCase";
import { GetOrderUseCase } from "data/usecases/GetOrderUseCase";
import {
  OrderDetailScreenProps,
  RootStackParamList,
} from "navigation/RootStackParamList";
import { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import containerstyle from "styles/containerstyle";
import textstyle from "styles/textstyle";

const OrderDetailScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const route = useRoute<OrderDetailScreenProps>();
  const orderData = route.params;
  const orderRepository = new OrderRepository(
    new GetOrderUseCase(),
    new GetOrderDetailUseCase()
  );

  const [products, setProducts] = useState<ProductOrderDetail[]>();
  const [isLoading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(String);

  const fetchOrderDetail = async () => {
    setLoading(true);

    const order = await orderRepository.getOrderDetail(orderId);
    setProducts(order.products);

    setLoading(false);
  };

  useEffect(() => {
    fetchOrderDetail();
    setOrderId(orderData.id);
  }, [orderId]);

  return (
    <SafeAreaView style={containerstyle.safearea}>
      <ScrollView style={{ paddingHorizontal: 16 }}>
        <View style={styles.container}>
          <Text style={styles.label}>Order ID</Text>
          <Text style={styles.text_value}>{orderData.id}</Text>
          <Text style={styles.label}>Customer Name</Text>
          <Text style={styles.text_value}>{orderData.customer_name}</Text>
          <Text style={styles.label}>Total Order Price</Text>
          <Text style={styles.text_value}>Rp {orderData.total_price}</Text>

          <Text
            style={[
              textstyle.TextParagraph1,
              { color: "#828282", marginTop: 24, marginBottom: 16 },
            ]}
          >
            Product Detail
          </Text>

          <View>
            {isLoading ? (
              <View style={styles.wrapper_indicator}>
                <ActivityIndicator size="large" color="#1BA8DF" />
              </View>
            ) : (
              <FlatList
                data={products}
                renderItem={({ item }) => (
                  <ItemOrderProductDetail product={item} />
                )}
              />
            )}
          </View>
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

  wrapper_indicator: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    flex: 1,
  },
});

export default OrderDetailScreen;
