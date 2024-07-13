import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "navigation/RootStackParamList";
import { SafeAreaView, StyleSheet } from "react-native";
import containerstyle from "styles/containerstyle";

const OrderDetailScreen = ({
  navigation,
}: NativeStackScreenProps<RootStackParamList>) => {
  return (
    <SafeAreaView style={containerstyle.safearea}>
        
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

})

export default OrderDetailScreen;