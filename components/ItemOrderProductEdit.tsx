import { ProductOrderDetail } from "data/model/OrderDetailModel";
import { Product } from "data/model/ProductModel";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import textstyle from "styles/textstyle";

interface ItemOrderProductEditProps {
  productOrder: ProductOrderDetail;
  products: Product[];
}

const ItemOrderProductEdit = ({
  productOrder,
  products,
}: ItemOrderProductEditProps) => {
  const [productSelected, setProductSelected] = useState<Product>({
      name: "-",
      price: productOrder.product_price,
      id : productOrder.product_id
  });
  const [quantity, setQuantity] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [price, setPrice] = useState<number>(productOrder.product_price);

  const handleProductChange = (item: Product) => {
    setProductSelected(item);
    setTotalPrice(item.price ?? 0 * quantity);
    setQuantity(1);
    setPrice(item.price)
  };

  const handleQuantityChange = (result: string) => {
    const text = result.replace(/^0/, "");

    if (text !== "0" && text.length > 0) {

      const quantityValue = parseInt(text, 10);
      setQuantity(quantityValue);
      setTotalPrice((productSelected?.price ?? 0) * quantityValue);

    } else if (text == "") {
      setQuantity(0);
      setTotalPrice((productSelected?.price ?? 0) * 0);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Text style={styles.label}>
        Product Name <Text style={styles.required}>*</Text>
      </Text>

      <Dropdown
        style={styles.dropdown}
        placeholderStyle={{ fontSize: 14, color: "#828282" }}
        fontFamily="poppins_semibold"
        placeholder={"Select product name"}
        data={products}
        labelField={"name"}
        valueField={"id"}
        onChange={handleProductChange}
      />

      <Text style={styles.label}>Price</Text>
      <Text style={styles.input_disable}>
        {price.toLocaleString()}
      </Text>

      <Text style={styles.label}>
        Quantity per Package <Text style={styles.required}>*</Text>
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Input quantity"
        value={quantity.toString()}
        onChangeText={handleQuantityChange}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Total Price</Text>
      <Text style={styles.input_disable}>{totalPrice}</Text>

      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
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
  },

  label: {
    ...textstyle.TextParagraph2,
    marginTop: 24,
  },
});

export default ItemOrderProductEdit;
