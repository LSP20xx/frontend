import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Text, View, Animated, Easing, StyleSheet } from 'react-native';

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
  const [integerPart, decimalPart] = numberString.split('.');
  let integerArr = integerPart.split('');
  const decimalArr = decimalPart ? decimalPart.split('') : [];

  let commaCount = 0;
  for (let i = integerArr.length - 1; i >= 0; i--) {
    commaCount++;
    if (commaCount % 3 === 0 && i !== 0) {
      integerArr.splice(i, 0, ',');
    }
  }

  if (decimalPart) {
    integerArr = integerArr.concat('.', decimalArr);
  }

  return integerArr;
}

const AnimatedNumber = ({
  animateToNumber,
  fontStyle,
  animationDuration,
  animationComplete,
  includeComma,
  easing,
  containerStyle,
  symbol,
  name,
}) => {
  const animationRef = useRef(null);

  const prevNumber = usePrevious(animateToNumber);

  const animateToNumberString = animateToNumber.toString();

  const prevNumberString = prevNumber ? prevNumber.toString() : '';

  const [isAnimationInitialized, setIsAnimationInitialized] = useState(false);

  const NUMBERS = useMemo(
    () =>
      Array(10)
        .fill(null)
        .map((_, i) => i),
    [],
  );

  const nextNumbersArr = useMemo(() => {
    return includeComma
      ? createNumberArrayWithComma(animateToNumberString)
      : animateToNumberString.split('');
  }, [animateToNumberString, includeComma]);

  const prevNumbersArr = useMemo(() => {
    return includeComma
      ? createNumberArrayWithComma(prevNumberString)
      : prevNumberString.split('');
  }, [prevNumberString, includeComma]);

  const [height, setHeight] = useState(0);

  const animations = useMemo(
    () =>
      height === 0
        ? []
        : nextNumbersArr.map((__, index) => {
            const value = nextNumbersArr[index];
            const numericValue = !isNaN(Number(value)) ? Number(value) : null; // Filtrar valores no numéricos

            if (!isNaN(numericValue)) {
              return new Animated.Value(-1 * height * index);
            } else {
              return new Animated.Value(0);
            }
          }),
    [nextNumbersArr, height],
  );

  const setButtonLayout = useCallback((e) => {
    setHeight(e.nativeEvent.layout.height);
  }, []);

  useEffect(() => {
    if (height === 0) return;

    if (animationRef.current) {
      animationRef.current.stop();
    }
    const compositions = animations
      .map((animation, index) => {
        const value = nextNumbersArr[index];
        if (!isNaN(value)) {
          return Animated.timing(animation, {
            toValue: -height * Number(value),
            duration: animationDuration || 800, // Ajustar la duración a 800ms
            useNativeDriver: true,
            easing: easing || Easing.out(Easing.quad), // Usar un easing más preciso
          });
        }
        return null;
      })
      .filter(Boolean);

    if (compositions.length > 0) {
      animationRef.current = Animated.parallel(compositions);
      animationRef.current.start();
    }
  }, [
    animations,
    height,
    isAnimationInitialized,
    animationDuration,
    easing,
    nextNumbersArr,
    prevNumbersArr,
  ]);

  return (
    <>
      {height !== 0 && (
        <View
          style={StyleSheet.flatten([
            containerStyle,
            { flexDirection: 'row', height },
          ])}
        >
          {symbol && <Text style={[fontStyle, { height }]}>{symbol}</Text>}
          {animateToNumber < 0 && (
            <Text style={[fontStyle, { height }]}>-</Text>
          )}

          {nextNumbersArr.map((n, index) => {
            if (
              n === '.' ||
              n === ',' ||
              prevNumbersArr[index] === nextNumbersArr[index]
            ) {
              return (
                <Text key={index} style={[fontStyle, { height }]}>
                  {n}
                </Text>
              );
            } else if (!isNaN(n)) {
              return (
                <View key={index} style={{ height, overflow: 'hidden' }}>
                  <Animated.View
                    style={{
                      transform: [
                        {
                          translateY: animations[index],
                        },
                      ],
                    }}
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
          {name && (
            <Text style={[fontStyle, { height }]}>
              {'  '}
              {name}
            </Text>
          )}
        </View>
      )}
      <View style={{ opacity: 0, position: 'absolute' }} pointerEvents="none">
        <Text style={fontStyle} onLayout={setButtonLayout} numberOfLines={1}>
          {animateToNumber}
        </Text>
      </View>
    </>
  );
};

export default AnimatedNumber;
