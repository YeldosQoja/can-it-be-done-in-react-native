import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useDerivedValue,
} from "react-native-reanimated";

const { height: wHeight, width: wWidth } = Dimensions.get("window");
export const backgroundImage = require("../assets/background.jpeg");
export const HEADER_IMAGE_HEIGHT = wHeight / 3;
const styles = StyleSheet.create({
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    width: wWidth,
    resizeMode: "cover",
  },
});

interface HeaderImageProps {
  y: SharedValue<number>;
}

export default ({ y }: HeaderImageProps) => {
  const height = useDerivedValue(() =>
    interpolate(
      y.value,
      [-100, 0],
      [HEADER_IMAGE_HEIGHT + 100, HEADER_IMAGE_HEIGHT],
      Extrapolation.CLAMP
    )
  );
  const top = useDerivedValue(() =>
    interpolate(y.value, [0, 100], [0, -100], Extrapolation.CLAMP)
  );
  return (
    <Animated.Image
      source={backgroundImage}
      style={[styles.image, { top, height }]}
    />
  );
};
