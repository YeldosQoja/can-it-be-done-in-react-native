import React, { RefObject } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  interpolate,
  Extrapolation,
  SharedValue,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Feather as Icon } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HEADER_IMAGE_HEIGHT } from "./HeaderImage";
import TabHeader from "./TabHeader";
import { TabModel } from "./Content";

const ICON_SIZE = 24;
const PADDING = 16;
export const MIN_HEADER_HEIGHT = 45;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
  },
  header: {
    flexDirection: "row",
    height: MIN_HEADER_HEIGHT,
    alignItems: "center",
    paddingHorizontal: PADDING,
  },
  title: {
    fontFamily: "UberMoveMedium",
    fontSize: 18,
    marginLeft: PADDING,
    flex: 1,
  },
});

interface HeaderProps {
  y: SharedValue<number>;
  tabs: TabModel[];
  scrollView: RefObject<Animated.ScrollView>;
}

export default ({ y, tabs, scrollView }: HeaderProps) => {
  const toggle = useSharedValue<0 | 1>(0);
  const insets = useSafeAreaInsets();
  const transition = useDerivedValue(() =>
    withTiming(toggle.value, { duration: 100 })
  );
  const { top: paddingTop } = insets;
  const translateX = useDerivedValue(() =>
    interpolate(
      y.value,
      [0, HEADER_IMAGE_HEIGHT],
      [-ICON_SIZE - PADDING, 0],
      Extrapolation.CLAMP
    )
  );
  const translateY = useDerivedValue(() =>
    interpolate(
      y.value,
      [-100, 0, HEADER_IMAGE_HEIGHT],
      [
        HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT + 100,
        HEADER_IMAGE_HEIGHT - MIN_HEADER_HEIGHT,
        0,
      ],
      Extrapolation.CLAMP
    )
  );
  const opacity = transition;

  useDerivedValue(() => {
    toggle.value = y.value >= HEADER_IMAGE_HEIGHT ? 1 : 0;
  });

  return (
    <Animated.View style={[styles.container, { paddingTop }]}>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          opacity,
          backgroundColor: "white",
        }}
      />
      <View style={styles.header}>
        <View>
          <Icon
            name="arrow-left"
            size={ICON_SIZE}
            color="white"
          />
          <Animated.View
            style={{ ...StyleSheet.absoluteFillObject, opacity: transition }}>
            <Icon
              name="arrow-left"
              size={ICON_SIZE}
              color="black"
            />
          </Animated.View>
        </View>
        <Animated.Text
          style={[
            styles.title,
            { transform: [{ translateX }, { translateY }] },
          ]}>
          Miss Miu Europaallee
        </Animated.Text>
        <Icon
          name="heart"
          size={ICON_SIZE}
          color="white"
        />
      </View>
      <TabHeader {...{ y, transition, tabs, scrollView }} />
    </Animated.View>
  );
};
