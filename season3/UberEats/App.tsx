import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import UberEats from "./components/UberEats";

export default function App() {
  return (
    <View style={styles.container}>
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
