import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { ProductRepository } from "data/repository/ProductRepository";
import { GetProductUseCase } from "data/usecases/GetProductUseCase";
import { RootStackParamList } from "navigation/RootStackParamList";
import { SafeAreaView, StyleSheet } from "react-native";
import containerstyle from "styles/containerstyle";

const OrderCreateScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const productRepository = new ProductRepository(new GetProductUseCase());

    // const product = await productRepository.getProduct();
    // console.log("product response :", product);

  return <SafeAreaView style={containerstyle.safearea}></SafeAreaView>;
};

const styles = StyleSheet.create({});

export default OrderCreateScreen;
