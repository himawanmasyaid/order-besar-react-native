import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import RootNavigator from 'navigation/RootNavigation';
import { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import textstyle from 'styles/textstyle';

export default function App() {

  const [fontsLoaded] = useFonts({
    poppins_bold: require("./assets/fonts/poppins_bold.ttf"),
    poppins_regular: require("./assets/fonts/poppins_regular.ttf"),
    poppins_semibold: require("./assets/fonts/poppins_semibold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      // setIsLoading(false);
    }
  }, [fontsLoaded]);

  return (
    <RootNavigator/>
  );
}