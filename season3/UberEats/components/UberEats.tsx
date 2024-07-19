import React, { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  runOnJS,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import HeaderImage, { HEADER_IMAGE_HEIGHT } from "./HeaderImage";
import Content, { defaultTabs } from "./Content";
import Header from "./Header";
import { setStatusBarStyle } from "expo-status-bar";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default () => {
  const scrollView = useRef<Animated.ScrollView>(null);
  const [tabs, setTabs] = useState(defaultTabs);
  const y = useSharedValue(0);
  useDerivedValue(() => {
    runOnJS(setStatusBarStyle)(
      y.value >= HEADER_IMAGE_HEIGHT ? "dark" : "light"
    );
  });
  return (
    <View style={styles.container}>
      <HeaderImage {...{ y }} />
      <Animated.ScrollView
        ref={scrollView}
        style={StyleSheet.absoluteFill}
        scrollEventThrottle={1}
        onScroll={({
          nativeEvent: {
            contentOffset: { y: value },
          },
        }) => {
          y.value = value;
        }}>
        <Content
          onMeasurement={(index, tab) => {
            tabs[index] = tab;
            setTabs([...tabs]);
          }}
          {...{ y }}
        />
      </Animated.ScrollView>
      <Header {...{ y, tabs, scrollView }} />
    </View>
  );
};
