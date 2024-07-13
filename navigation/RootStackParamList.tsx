import { RouteProp } from "@react-navigation/native";
import { Order } from "data/model/OrderModel";

export type RootStackParamList = {
    order : undefined,
    order_detail : Order,
    order_create : undefined,
    order_edit: Order,
}

// Routes
export type OrderDetailScreenProps = RouteProp<RootStackParamList, "order_detail">
export type OrderEditScreenProps = RouteProp<RootStackParamList, "order_edit">