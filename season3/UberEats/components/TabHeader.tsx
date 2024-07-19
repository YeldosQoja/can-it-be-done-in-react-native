import React, { RefObject, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import Animated, {
  interpolate,
  SharedValue,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import MaskedView from "@react-native-masked-view/masked-view";

import Tabs from "./Tabs";
import { TabModel } from "./Content";

const styles = StyleSheet.create({
  container: {
    marginLeft: 8,
    height: 45,
    marginBottom: 8,
    flexDirection: "row",
  },
});

interface TabHeaderProps {
  transition: SharedValue<number>;
  y: SharedValue<number>;
  tabs: TabModel[];
  scrollView: RefObject<Animated.ScrollView>;
}

export default ({ transition, y, tabs, scrollView }: TabHeaderProps) => {
  const index = useSharedValue<number>(0);
  const [measurements, setMeasurements] = useState<number[]>(
    new Array(tabs.length).fill(0)
  );
  const opacity = transition;
  const indexTransition = useDerivedValue(() => withTiming(index.value));
  const width = useDerivedValue(() =>
    interpolate(
      indexTransition.value,
      tabs.map((_, i) => i),
      measurements
    )
  );
  const translateX = useDerivedValue(() =>
    interpolate(
      indexTransition.value,
      tabs.map((_tab, i) => i),
      measurements.map((_, i) => {
        return (
          -1 *
            measurements
              .filter((_measurement, j) => j < i)
              .reduce((acc, m) => acc + m, 0) -
          8 * i
        );
      })
    )
  );
  const style = {
    borderRadius: 24,
    backgroundColor: "black",
    width,
    flex: 1,
  };
  const maskElement = <Animated.View {...{ style }} />;

  useDerivedValue(() => {
    for (let i = 0; i < tabs.length; i++) {
      if (
        tabs[i].anchor <= y.value &&
        (i + 1 === tabs.length || y.value <= tabs[i + 1].anchor)
      ) {
        index.value = i;
      }
    }
  });

  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          transform: [{ translateX }],
        }}>
        <Tabs
          onMeasurement={(i, m) => {
            measurements[i] = m;
            setMeasurements([...measurements]);
          }}
          {...{ tabs, translateX }}
        />
      </Animated.View>
      <View>
        <Animated.View
          style={[
            style,
            Platform.OS === "android"
              ? {
                  backgroundColor: "transparent",
                  borderColor: "black",
                  borderWidth: 1,
                }
              : {},
          ]}
        />
      </View>
      {Platform.OS === "ios" && (
        // see https://github.com/react-native-community/react-native-masked-view/issues/22
        <MaskedView
          style={StyleSheet.absoluteFill}
          maskElement={maskElement}>
          <Animated.View
            style={{
              ...StyleSheet.absoluteFillObject,
              transform: [{ translateX }],
            }}>
            <Tabs
              active
              onPress={(i) => {
                if (scrollView.current) {
                  scrollView.current.scrollTo({ y: tabs[i].anchor + 1 });
                }
              }}
              {...{ tabs, translateX }}
            />
          </Animated.View>
        </MaskedView>
      )}
    </Animated.View>
  );
};
