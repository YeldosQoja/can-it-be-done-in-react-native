import * as React from "react";
import { Image, StyleSheet } from "react-native";
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";
import { Album, MAX_HEADER_HEIGHT, HEADER_DELTA } from "./Model";
import { BUTTON_HEIGHT } from "./ShufflePlay";

interface CoverProps {
  album: Album;
  y: SharedValue<number>;
}

export default ({ album: { cover }, y }: CoverProps) => {

  const containerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(y.value, [-MAX_HEADER_HEIGHT, 0], [4, 1], {
          extrapolateRight: Extrapolation.CLAMP,
        }),
      },
    ],
  }));

  const opacityStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      y.value,
      [-64, 0, HEADER_DELTA],
      [0, 0.2, 1],
      Extrapolation.CLAMP
    ),
  }));

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <Image
        style={styles.image}
        source={cover}
      />
      <Animated.View
        style={[
          {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: "black",
          },
          opacityStyle,
        ]}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: MAX_HEADER_HEIGHT + BUTTON_HEIGHT * 2,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
});
