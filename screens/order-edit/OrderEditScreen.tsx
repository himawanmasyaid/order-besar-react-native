import { useRoute } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import ItemOrderProductEdit from "components/ItemOrderProductEdit";
import { ProductOrderDetail } from "data/model/OrderDetailModel";
import { Product, ProductModel } from "data/model/ProductModel";
import { OrderRepository } from "data/repository/OrderRepository";
import { ProductRepository } from "data/repository/ProductRepository";
import { GetOrderDetailUseCase } from "data/usecases/GetOrderDetailUseCase";
import { GetOrderUseCase } from "data/usecases/GetOrderUseCase";
import { GetProductUseCase } from "data/usecases/GetProductUseCase";
import {
  OrderEditScreenProps,
  RootStackParamList,
} from "navigation/RootStackParamList";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import containerstyle from "styles/containerstyle";
import textstyle from "styles/textstyle";

const OrderEditScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const route = useRoute<OrderEditScreenProps>();
  const order = route.params;

  const productRepository = new ProductRepository(new GetProductUseCase());
  const orderRepository = new OrderRepository(
    new GetOrderUseCase(),
    new GetOrderDetailUseCase()
  );

  const [products, setProducts] = useState<Product[]>([]);
  const [orderProducts, setOrderProducts] = useState<ProductOrderDetail[]>();
  const [isLoading, setLoading] = useState(false);

  const fetchProduct = async () => {
    console.log("=== fetch Product ===");

    const response = await productRepository.getProduct();
    setProducts(response.data);
  };

  const fetchOrderDetail = async () => {
    console.log("=== fetch Orders Detail ===");
    const response = await orderRepository.getOrderDetail(order.id);
    setOrderProducts(response.products);
  };

  const handleFetchData = async () => {
    console.log("order edit screen mount");
    setLoading(true);
    await fetchOrderDetail();
    await fetchProduct();
    setLoading(false);
  };

  useEffect(() => {
    console.log("order edit screen use effect");
    handleFetchData();
  }, []);

  return (
    <SafeAreaView style={containerstyle.safearea}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={textstyle.TextParagraph2}>
            Customer Name <Text style={styles.required}>*</Text>
          </Text>

          <Text style={styles.input}>{order.customer_name}</Text>

          <View style={styles.line} />

          <Text
            style={[
              textstyle.TextParagraph2Medium,
              { color: "#828282", marginBottom: 24 },
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
                data={orderProducts}
                renderItem={({ item }) => (
                  <ItemOrderProductEdit
                    productOrder={item}
                    products={products}
                  />
                )}
              />
            )}
          </View>

          <View style={styles.bottom_button_container}>
            <TouchableOpacity
              style={[styles.button_outline, { marginEnd: 4 }]}
              onPress={() => navigation.canGoBack() && navigation.goBack()}
            >
              <Text
                style={[textstyle.TextParagraph2Bold, { color: "#2D9CDB" }]}
              >
                Back
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button_save, { marginStart: 4 }]}>
              <Text style={[textstyle.TextParagraph2Bold, { color: "#fff" }]}>
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingTop: 16,
  },

  required: {
    color: "#EB5757",
  },

  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    paddingStart: 16,
    paddingEnd: 16,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 4,
    fontSize: 14,
    fontFamily: "poppins_semibold",
    marginTop: 6,
    backgroundColor: "#fff",
  },

  line: {
    backgroundColor: "#E0E0E0",
    height: 1,
    width: "100%",
    marginTop: 24,
    marginBottom: 24,
  },

  button_outline: {
    flex: 1,
    borderColor: "#E0E0E0",
    backgroundColor: "#fff",
    color: "#052A49",
    borderWidth: 1,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },

  button_save: {
    flex: 1,
    backgroundColor: "#2D9CDB",
    color: "#fff",
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },

  wrapper_indicator: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    flex: 1,
  },

  bottom_button_container: {
    flex: 2,
    flexDirection: "row",
    marginTop: 32,
    marginBottom: 24,
  },
});

export default OrderEditScreen;
