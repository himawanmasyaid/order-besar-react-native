import { NavigationProp, useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Product } from "data/model/ProductModel";
import { ProductRepository } from "data/repository/ProductRepository";
import { GetProductUseCase } from "data/usecases/GetProductUseCase";
import { RootStackParamList } from "navigation/RootStackParamList";
import { useCallback, useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import containerstyle from "styles/containerstyle";
import textstyle from "styles/textstyle";

const OrderCreateScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  const productRepository = new ProductRepository(new GetProductUseCase());

  const [productsList, setProductList] = useState<Product[]>([]);
  const [product, setProduct] = useState<Product>();
  const [isLoading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [customerName, setCustomerName] = useState<string>();

  const fetchProducts = useCallback(async () => {
    setLoading(true);

    const products = await productRepository.getProduct();

    setProductList(products.data);

    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleProductChange = (item: Product) => {
    setProduct(item);
    setTotalPrice(item.price ?? 0 * quantity);
    setQuantity(1);
  };

  const handleQuantityChange = (result: string) => {
    const text = result.replace(/^0/, "");

    if (text !== "0" && text.length > 0) {
      const quantityValue = parseInt(text, 10);
      setQuantity(quantityValue);
      setTotalPrice((product?.price ?? 0) * quantityValue);
    } else if (text == "") {
      setQuantity(0);
      setTotalPrice((product?.price ?? 0) * 0);
    }
  };

  return (
    <SafeAreaView style={containerstyle.safearea}>
      <ScrollView>
        <View style={styles.container}>
          <Text style={textstyle.TextParagraph2}>
            Customer Name <Text style={styles.required}>*</Text>
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Input customer name"
            value={customerName}
            onChangeText={setCustomerName}
          />

          <View style={styles.line} />

          <Text
            style={[
              textstyle.TextParagraph2Medium,
              { color: "#828282", marginBottom: 24 },
            ]}
          >
            Product Detail
          </Text>

          <Text style={[textstyle.TextParagraph2, {}]}>
            Product Name <Text style={styles.required}>*</Text>
          </Text>

          <Dropdown
            style={styles.dropdown}
            placeholderStyle={{ fontSize: 14, color: "#828282" }}
            fontFamily="poppins_semibold"
            placeholder={"Select product name"}
            data={productsList}
            labelField={"name"}
            valueField={"id"}
            onChange={handleProductChange}
          />

          <Text style={[textstyle.TextParagraph2, { marginTop: 24 }]}>
            Price
          </Text>
          <Text style={styles.input_disable}>
            {product?.price.toLocaleString()}
          </Text>

          <Text style={[textstyle.TextParagraph2, { marginTop: 24 }]}>
            Quantity <Text style={styles.required}>*</Text>
          </Text>

          <TextInput
            style={styles.input}
            placeholder="Input quantity"
            value={quantity.toString()}
            onChangeText={handleQuantityChange}
            keyboardType="numeric"
          />

          <View style={styles.line} />

          <Text style={[textstyle.TextParagraph2, {}]}>Total Order Price</Text>
          <Text style={styles.input_disable}>
            {totalPrice.toLocaleString()}
          </Text>

          <View style={{ flex: 2, flexDirection: "row", marginTop: 32 }}>
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
    paddingStart: 16,
    paddingEnd: 16,
    paddingTop: 16,
  },

  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
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

  dropdown: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    paddingStart: 16,
    paddingEnd: 16,
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 4,
    fontSize: 12,
    fontFamily: "poppins_semibold",
    marginTop: 6,
    backgroundColor: "#fff",
    maxHeight: 300,
  },

  input_disable: {
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
    backgroundColor: "#F2F2F2",
    color: "#828282",
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
});

export default OrderCreateScreen;
