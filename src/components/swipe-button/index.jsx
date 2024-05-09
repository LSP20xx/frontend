import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import Animated, {
  Extrapolate,
  interpolate,
  interpolateColor,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from "react-native-reanimated";
import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const BUTTON_WIDTH = SCREEN_WIDTH - 48;
const BUTTON_HEIGHT = 60;
const BUTTON_PADDING = 10;
const SWIPEABLE_DIMENSIONS = BUTTON_HEIGHT - 2 * BUTTON_PADDING;

const H_WAVE_RANGE = SWIPEABLE_DIMENSIONS + 2 * BUTTON_PADDING;
const H_SWIPE_RANGE = BUTTON_WIDTH - 2 * BUTTON_PADDING - SWIPEABLE_DIMENSIONS;

/// context from reanimated created a object and stroes in the ui thread and it does not come back and forth
const SwipeButton = ({ onToggle }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const sharedValue = useSharedValue(0);
  const AnimatedLinearGradient =
    Animated.createAnimatedComponent(LinearGradient);
  const [toggled, setToggled] = useState(false);
  const handleComplete = (isToggled) => {
    if (isToggled !== toggled) {
      setToggled(isToggled);
      onToggle(isToggled);
    }
  };
  const animatedGestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.completed = toggled;
    },
    onActive: (e, ctx) => {
      let newValue;
      if (ctx.completed) {
        newValue = H_SWIPE_RANGE + e.translationX;
      } else {
        newValue = e.translationX;
      }

      if (newValue >= 0 && newValue <= H_SWIPE_RANGE) {
        sharedValue.value = newValue;
      }
    },
    onEnd: () => {
      // Cambiar la condición de finalización para que sea el 85% del H_SWIPE_RANGE
      if (sharedValue.value < H_SWIPE_RANGE * 0.85) {
        sharedValue.value = withSpring(0);
        runOnJS(handleComplete)(false);
      } else {
        sharedValue.value = withSpring(H_SWIPE_RANGE);
        runOnJS(handleComplete)(true);
      }
    },
  });
  // colors is from the version one use interpolatecolors
  const animatedStylesSwipe = useAnimatedStyle(() => ({
    transform: [{ translateX: sharedValue.value }],
    backgroundColor: interpolateColor(
      sharedValue.value,
      [0, H_SWIPE_RANGE],
      [theme.primaryLight, theme.background]
    ),
  }));
  const InterpolateXInput = [0, H_SWIPE_RANGE];
  const animatedStylesText = useAnimatedStyle(() => ({
    opacity: interpolate(
      sharedValue.value,
      InterpolateXInput,
      [0.7, 0],
      Extrapolate.CLAMP
    ),
    transform: [
      {
        translateX: interpolate(
          sharedValue.value,
          InterpolateXInput,
          [0, BUTTON_WIDTH / 2 - SWIPEABLE_DIMENSIONS],
          Extrapolate.CLAMP
        ),
      },
    ],
  }));

  const colorWave = useAnimatedStyle(() => ({
    width: Math.min(H_WAVE_RANGE + sharedValue.value, BUTTON_WIDTH),
    opacity: interpolate(sharedValue.value, InterpolateXInput, [0, 1]),
  }));

  return (
    <GestureHandlerRootView style={styles.containerStyle}>
      <AnimatedLinearGradient
        colors={[theme.primaryLight, theme.primaryLight]}
        start={{ x: 0.0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={[styles.background, colorWave]}
      />
      <PanGestureHandler onGestureEvent={animatedGestureHandler}>
        <Animated.View
          style={[styles.swipeableCircle, animatedStylesSwipe]}
        ></Animated.View>
      </PanGestureHandler>
      <Animated.Text style={[styles.swipeText, animatedStylesText]}>
        DESLIZAR Y CONFIRMAR
      </Animated.Text>
    </GestureHandlerRootView>
  );
};

const getStyles = (theme) =>
  StyleSheet.create({
    containerStyle: {
      backgroundColor: theme.background,
      height: BUTTON_HEIGHT,
      width: BUTTON_WIDTH,
      borderRadius: BUTTON_HEIGHT / 2,
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 16,
    },
    swipeableCircle: {
      height: SWIPEABLE_DIMENSIONS,
      width: SWIPEABLE_DIMENSIONS,
      backgroundColor: theme.primaryLight || "red",
      borderRadius: SWIPEABLE_DIMENSIONS / 2,
      position: "absolute",
      zIndex: 3,
      left: BUTTON_PADDING,
    },
    swipeText: {
      alignSelf: "center",
      fontSize: 18,
      fontFamily: "Uto-Bold",
      zIndex: 2,
      width: 160,
      textAlign: "center",
      color: theme.black || "#1b9aaa",
    },
    background: {
      height: BUTTON_HEIGHT,
      borderRadius: BUTTON_HEIGHT / 2,
      position: "absolute",
      left: 0,
      backgroundColor: theme.primaryLight || "red",
    },
  });

export default SwipeButton;
