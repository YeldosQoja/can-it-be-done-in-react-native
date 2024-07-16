import * as React from "react";
import { StyleSheet } from "react-native";
import Constants from "expo-constants";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { MIN_HEADER_HEIGHT, HEADER_DELTA } from "./Model";
import { BUTTON_HEIGHT } from "./ShufflePlay";

interface HeaderProps {
  artist: string;
  y: SharedValue<number>;
}

export default ({ artist, y }: HeaderProps) => {
  const style = useAnimatedStyle(() => ({
    opacity: interpolate(
      y.value,
      [HEADER_DELTA - 8, HEADER_DELTA - 2],
      [0, 1],
      Extrapolation.CLAMP
    ),
  }));
  const titleStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      y.value,
      [HEADER_DELTA - 8, HEADER_DELTA - 2],
      [0, 1],
      Extrapolation.CLAMP
    ),
  }));
  return (
    <Animated.View style={[styles.container, style]}>
      <Animated.Text style={[styles.title, titleStyle]}>{artist}</Animated.Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: BUTTON_HEIGHT / 2 - MIN_HEADER_HEIGHT,
    left: 0,
    right: 0,
    height: MIN_HEADER_HEIGHT,
    backgroundColor: "black",
    paddingTop: Constants.statusBarHeight,
  },
  title: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "400",
  },
});
