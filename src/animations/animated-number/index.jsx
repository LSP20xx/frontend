import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { Text, View, Animated, Easing, StyleSheet } from "react-native";

function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

function toAbsoluteNumber(num) {
  return Math.abs(num);
}
function createNumberArrayWithComma(numberString) {
  console.log("NUMBERSTRING", numberString);
  const [integerPart, decimalPart] = numberString.split(".");
  let integerArr = integerPart.split("");
  const decimalArr = decimalPart ? decimalPart.split("") : [];

  let commaCount = 0;
  for (let i = integerArr.length - 1; i >= 0; i--) {
    commaCount++;
    if (commaCount % 3 === 0 && i !== 0) {
      integerArr.splice(i, 0, ",");
    }
  }

  if (decimalPart) {
    integerArr = integerArr.concat(".", decimalArr);
  }

  console.log("RESULT ARRAY", integerArr);
  return integerArr;
}

const AnimatedNumber = ({
  animateToNumber,
  fontStyle,
  animationDuration,
  includeComma,
  easing,
  containerStyle,
}) => {
  const animationRef = useRef(null);

  const prevNumber = usePrevious(animateToNumber);

  const animateToNumberString = animateToNumber.toString();

  const prevNumberString = prevNumber ? prevNumber.toString() : "";

  const NUMBERS = useMemo(
    () =>
      Array(10)
        .fill(null)
        .map((_, i) => i),
    []
  );

  const nextNumbersArr = useMemo(() => {
    return includeComma
      ? createNumberArrayWithComma(animateToNumberString)
      : animateToNumberString.split("");
  }, [animateToNumberString, includeComma]);

  const prevNumbersArr = useMemo(() => {
    return includeComma
      ? createNumberArrayWithComma(prevNumberString)
      : prevNumberString.split("");
  }, [prevNumberString, includeComma]);

  const [height, setHeight] = React.useState(0);

  const animations = useMemo(
    () =>
      height === 0
        ? []
        : nextNumbersArr.map((__, index) => {
            const value = nextNumbersArr[index];
            if (!isNaN(value)) {
              return new Animated.Value(-1 * height * index);
            } else {
              return new Animated.Value(0);
            }
          }),
    [nextNumbersArr, height]
  );

  const setButtonLayout = useCallback((e) => {
    setHeight(e.nativeEvent.layout.height);
  }, []);

  React.useEffect(() => {
    if (height === 0) return;

    if (animationRef.current) {
      animationRef.current.stop();
    }

    const compositions = animations.reduce((acc, animation, index) => {
      const value = nextNumbersArr[index];
      if (!isNaN(value)) {
        acc.push(
          Animated.timing(animation, {
            toValue: -1 * (height * value),
            duration: animationDuration || 1400,
            useNativeDriver: true,
            easing: easing || Easing.elastic(1.2),
          })
        );
      }

      return acc;
    }, []);

    animationRef.current = Animated.parallel(compositions);
    animationRef.current.start();
  }, [animations, height]);

  useEffect(() => {
    console.log("nextNumbers", nextNumbersArr);
  }, [nextNumbersArr]);

  return (
    <>
      {height !== 0 && (
        <View
          style={StyleSheet.flatten([
            containerStyle,
            { flexDirection: "row", height },
          ])}
        >
          {animateToNumber < 0 && (
            <Text style={[fontStyle, { height }]}>-</Text>
          )}
          {nextNumbersArr.map((n, index) => {
            if (n === ".") {
              return (
                <Text key={index} style={[fontStyle, { height }]}>
                  {n}
                </Text>
              );
            } else if (!isNaN(n)) {
              return (
                <View key={index} style={{ height, overflow: "hidden" }}>
                  <Animated.View
                    style={[
                      {
                        transform: [
                          {
                            translateY: animations[index],
                          },
                        ],
                      },
                    ]}
                  >
                    {NUMBERS.map((number, i) => (
                      <Text
                        style={StyleSheet.flatten([fontStyle, { height }])}
                        key={i}
                      >
                        {number}
                      </Text>
                    ))}
                  </Animated.View>
                </View>
              );
            } else {
              return (
                <Text key={index} style={[fontStyle, { height }]}>
                  {n}
                </Text>
              );
            }
          })}
        </View>
      )}
      <View style={{ opacity: 0, position: "absolute" }} pointerEvents="none">
        <Text style={fontStyle} onLayout={setButtonLayout} numberOfLines={1}>
          {animateToNumber}
        </Text>
      </View>
    </>
  );
};

export default AnimatedNumber;
