import { NavigationProp, useNavigation } from "@react-navigation/native";
import ItemOrder from "components/ItemOrder";
import { Order, OrderModel } from "data/model/OrderModel";
import { OrderRepository } from "data/repository/OrderRepository";
import { ProductRepository } from "data/repository/ProductRepository";
import { GetOrderDetailUseCase } from "data/usecases/GetOrderDetailUseCase";
import { GetOrderUseCase } from "data/usecases/GetOrderUseCase";
import { GetProductUseCase } from "data/usecases/GetProductUseCase";
import { RootStackParamList } from "navigation/RootStackParamList";
import { useEffect, useState } from "react";
import {
  FlatList,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import containerstyle from "styles/containerstyle";
import textstyle from "styles/textstyle";

const OrderScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const orderRepository = new OrderRepository(
    new GetOrderUseCase(),
    new GetOrderDetailUseCase()
  );

  const [orders, setOrder] = useState<Order[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isHasMore, setHasMore] = useState(true);
  const [isShowDeleteModal, setShowDeleteModal] = useState(false);

  const fetchOrders = async () => {

    setLoading(true);

    const order = await orderRepository.getOrders(page, limit);

    setOrder([...orders, ...order.list]);

    // setOrder(order.list);

    setLoading(false);

    if (order.list.length < limit) {
      setHasMore(false);
    }

  };

  const fetchOrderLoadMore = () => {
    if (isHasMore) {
      setPage(page + 1);
      fetchOrders()
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page, limit]);

  return (
    <SafeAreaView style={containerstyle.safearea}>
      <View style={styles.container}>
        {isLoading && page === 1 ? (
          <View style={styles.wrapper_indicator}>
            <ActivityIndicator size="large" color="#1BA8DF" />
          </View>
        ) : (
          <FlatList
            data={orders}
            renderItem={({ item }) => (
              <ItemOrder
                order={item}
                onEditPress={() => navigation.navigate("order_edit", item)}
                onDetailPress={() => navigation.navigate("order_detail", item)}
                onDeletePress={() => setShowDeleteModal(true)}
              />
            )}
            keyExtractor={(item) => item.id}
            onEndReached={fetchOrderLoadMore}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              isHasMore ? (
                <View style={styles.wrapper_indicator}>
                  <ActivityIndicator size="large" color="#052A49" />
                </View>
              ) 
              : (
                <Text style={styles.no_more_data}>No More Data</Text>
              )
            }
          />
        )}

        {/* modal popup delete order */}

        <View style={{ flex: 1 }}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={isShowDeleteModal}
            onRequestClose={() => setShowDeleteModal(false)}
          >
            <View style={styles.modal_overlay}>
              <View
                style={{
                  backgroundColor: "#fff",
                  borderRadius: 8,
                  padding: 16,
                  width: "90%",
                  justifyContent: "center",
                  alignItems: "center",
                  marginHorizontal: 16,
                }}
              >
                <Text style={textstyle.TextParagraph1Bold}>
                  Are You Sure To Delete This?
                </Text>

                <Text
                  style={[
                    textstyle.TextParagraph2,
                    { textAlign: "center", marginTop: 20 },
                  ]}
                >
                  You can't recover data because it will be deleted permanently.
                </Text>

                <TouchableOpacity style={styles.button_outline_alert_modal}>
                  <Text
                    style={[textstyle.TextParagraph1Bold, { color: "#EB5757" }]}
                  >
                    Yes, Delete It
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setShowDeleteModal(false)}
                  style={styles.button_primary}
                >
                  <Text
                    style={[textstyle.TextParagraph1Bold, { color: "#fff" }]}
                  >
                    Back
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  // modal popup style

  modal_button_container: {
    marginTop: 20,
    flex: 1,
  },

  modal_container: {
    flexDirection: "column",
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 20,
  },

  modal_overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // add a dark overlay to dim the background
  },

  button_outline_alert_modal: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#EB5757",
    borderWidth: 1,
    backgroundColor: "#fff",
    marginBottom: 16,
    paddingVertical: 8,
    marginTop: 24,
    width: "100%",
    borderRadius: 4,
  },

  button_primary: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    backgroundColor: "#052A49",
    paddingVertical: 8,
    width: "100%",
    borderRadius: 4,
  },

  wrapper_indicator: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },

  no_more_data: {
    ...textstyle.TextParagraph2,
    textAlign: 'center',
    fontSize: 16,
    padding: 16,
    color: '#999',
  },

});

export default OrderScreen;
