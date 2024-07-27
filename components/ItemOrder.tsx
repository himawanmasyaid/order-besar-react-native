import { Order } from "data/model/OrderModel";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import textstyle from "styles/textstyle";

interface ItemOrderProps {
  order: Order;
  onEditPress: () => void;
  onDetailPress: () => void;
  onDeletePress: () => void;
}

const ItemOrder = ({
  order,
  onEditPress,
  onDetailPress,
  onDeletePress,
}: ItemOrderProps) => {
  return (
    <View style={styles.container}>
      <Text style={textstyle.TextParagraph2Medium}>Order ID</Text>
      <Text style={textstyle.TextParagraph2Bold}>{order.id}</Text>

      <View style={styles.line} />

      <View style={{ flex: 1 }}>
        <View style={styles.item_text_wrapper}>
          <Text style={styles.paragraph}>Customer</Text>
          <Text style={styles.paragraph_right}>{order.customer_name}</Text>
        </View>
        <View style={styles.item_text_wrapper}>
          <Text style={styles.paragraph}>Total Products</Text>
          <Text style={styles.paragraph_right}>{order.total_products}</Text>
        </View>
        <View style={styles.item_text_wrapper}>
          <Text style={styles.paragraph}>Total Price</Text>
          <Text style={styles.paragraph_right}>{order.total_price}</Text>
        </View>
        <View style={styles.item_text_wrapper}>
          <Text style={styles.paragraph}>Order Date</Text>
          <Text style={styles.paragraph_right}>{order.created_at}</Text>
        </View>
      </View>

      <View style={{ padding: 8 }} />

      <View style={[styles.action_container, { flex: 1 }]}>
        <View style={[styles.action_container_button, { marginEnd: 8 }]}>
          <TouchableOpacity
            style={[styles.button_edit, { marginEnd: 4 }]}
            onPress={onEditPress}
          >
            <Text style={styles.text_button}>Edit</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button_outline, { marginStart: 4 }]}
            onPress={onDetailPress}
          >
            <Text style={[styles.text_button, { color: "#2D9CDB" }]}>
              Detail
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button_delete} onPress={onDeletePress}>
          <Image
            source={require("../assets/ic_delete.png")}
            style={styles.deleteIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingTop: 12,
    paddingBottom: 12,
    paddingStart: 16,
    paddingEnd: 16,
    marginBottom: 16,
    marginStart: 16,
    marginEnd: 16,
  },

  item_space_between: {
    flexDirection: "row",
    marginTop: 4,
    marginBottom: 4,
  },

  line: {
    backgroundColor: "#E0E0E0",
    height: 1,
    width: "100%",
    marginTop: 16,
    marginBottom: 16,
  },

  buttonContainer: {
    alignItems: "flex-end",
  },

  action_container: {
    flexDirection: "row",
    justifyContent: "flex-end",
    height: 50,
  },

  action_container_button: {
    flex: 2,
    flexDirection: "row",
    height: 50,
  },

  button_edit: {
    flex: 1,
    backgroundColor: "#294370",
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },

  button_outline: {
    flex: 1,
    borderColor: "#2D9CDB",
    backgroundColor: "#fff",
    borderWidth: 1,
    height: 36,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },

  button_delete: {
    width: 36,
    height: 36,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  deleteIcon: {
    width: 24,
    height: 24,
  },

  item_text_wrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 2,
  },

  paragraph: {
    ...textstyle.TextParagraph2,
    flex: 0,
    padding: 0,
  },

  paragraph_right: {
    flex: 1,
    ...textstyle.TextParagraph2,
    textAlign: "right",
  },

  text_button: {
    ...textstyle.TextParagraph2Bold,
    color: "#fff",
    width: "100%",
    textAlign: "center",
  },
});

export default ItemOrder;
