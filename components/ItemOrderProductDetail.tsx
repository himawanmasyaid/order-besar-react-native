import { ProductOrderDetail } from "data/model/OrderDetailModel";
import { StyleSheet, Text, View } from "react-native";
import textstyle from "styles/textstyle";

interface ItemOrderProductDetailProps {
  product: ProductOrderDetail;
}

const ItemOrderProductDetail = ({ product }: ItemOrderProductDetailProps) => {
  return (
    <View style={{ flex: 1 }}>

      <View style={styles.item_text_wrapper}>
        <Text style={styles.paragraph}>Product Name</Text>
        <Text style={styles.paragraph_right}>-</Text>
      </View>
      <View style={styles.item_text_wrapper}>
        <Text style={styles.paragraph}>Price</Text>
        <Text style={styles.paragraph_right}>Rp {product.product_price}</Text>
      </View>
      <View style={styles.item_text_wrapper}>
        <Text style={styles.paragraph}>Quantity</Text>
        <Text style={styles.paragraph_right}>{product.quantity}</Text>
      </View>
      <View style={styles.item_text_wrapper}>
        <Text style={styles.paragraph}>Total Price</Text>
        <Text style={styles.paragraph_right}>Rp {product.product_price * product.quantity}</Text>
      </View>
      
      <View style={styles.line} />

    </View>
  );
};

const styles = StyleSheet.create({
  item_wrapper: {
    marginBottom: 8,
  },

  item_text_wrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 2,
    marginBottom: 8,
  },

  paragraph: {
    ...textstyle.TextParagraph2,
    flex: 0,
    padding: 0,
    color: "#4F4F4F",
  },

  paragraph_right: {
    flex: 1,
    ...textstyle.TextParagraph2,
    textAlign: "right",
  },

  line: {
    backgroundColor: "#E0E0E0",
    height: 1,
    width: "100%",
    marginTop: 16,
    marginBottom: 16,
  },
});

export default ItemOrderProductDetail;
