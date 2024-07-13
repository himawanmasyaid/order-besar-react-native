import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import OrderScreen from "screens/order/OrderScreen";
import { Image, Text, View, TouchableOpacity, StyleSheet } from "react-native";
import textstyle from "styles/textstyle";
import OrderCreateScreen from "screens/order-create/OrderCreateScreen";
import OrderDetailScreen from "screens/order-detail/OrderDetailScreen";
import OrderEditScreen from "screens/order-edit/OrderEditScreen";

const RootStack = createStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="order">
        <RootStack.Screen
          name="order"
          component={OrderScreen}
          options={({ navigation }) => ({
            headerShown: true,
            headerTitleAlign: "center",
            headerTitle: () => (
              <View style={styles.headerTitleContainer}>
                <Text style={styles.headerTitleText}> Order </Text>
              </View>
            ),
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate("order_create")}
              >
                <Image
                  source={require("../assets/ic_add.png")}
                  style={{ width: 24, height: 24, marginLeft: 16 }}
                />
              </TouchableOpacity>
            ),
          })}
        />
        <RootStack.Screen
          name="order_create"
          component={OrderCreateScreen}
          options={({ navigation }) => ({
            headerShown: true,
            headerTitleAlign: "center",
            headerTitle: () => (
              <View style={styles.headerTitleContainer}>
                <Text style={styles.headerTitleText}>Add New Order</Text>
              </View>
            ),
          })}
        />
        <RootStack.Screen
          name="order_detail"
          component={OrderDetailScreen}
          options={({ route }) => ({
            headerShown: true,
            headerTitleAlign: "center",
            headerTitle: () => (
              <View style={styles.headerTitleContainer}>
                <Text style={styles.headerTitleText}>Order Detail</Text>
              </View>
            ),
          })}
        />
        <RootStack.Screen
          name="order_edit"
          component={OrderEditScreen}
          options={({ navigation }) => ({
            headerShown: true,
            headerTitleAlign: "center",
            headerTitle: () => (
              <View style={styles.headerTitleContainer}>
                <Text style={styles.headerTitleText}>Edit Order</Text>
              </View>
            ),
          })}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  headerTitleContainer: {
    paddingHorizontal: 16, // add some padding for better look
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitleText: {
    ...textstyle.TextParagraph1Bold,
    textAlign: "center",
    color: "#333333"
  },
});

export default RootNavigator;
