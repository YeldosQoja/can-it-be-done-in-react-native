import { StatusBar } from "expo-status-bar";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import UberEats from "./components/UberEats";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <SafeAreaProvider>
        <UberEats />
      </SafeAreaProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
