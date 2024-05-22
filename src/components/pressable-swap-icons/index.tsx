import React, { useRef } from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { COLORS } from '../../constants';

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" viewBox="0 0 450.63 269.91"><defs><style>.cls-1{fill:#f18321;}</style></defs><path class="cls-1" d="M0,164.34a6.3,6.3,0,0,0,1.88,4.86l101.32,98.89A6.36,6.36,0,0,0,114,263.54V227.25a6.35,6.35,0,0,1,6.35-6.35H444.28a6.35,6.35,0,0,0,6.35-6.36v-50.2Z"/><path class="cls-1" d="M450.63,105.57a6.33,6.33,0,0,0-1.89-4.86L347.42,1.82a6.34,6.34,0,0,0-10.78,4.54v36.3A6.35,6.35,0,0,1,330.29,49H6.35A6.35,6.35,0,0,0,0,55.36v50.21Z"/></svg>`;

function PressableSwapIcons({ onPress }) {
  const rotationDegrees = useRef(0);
  const rotateAnim = useRef(new Animated.Value(0)).current;

  const animatePress = () => {
    rotationDegrees.current += 180;
    Animated.timing(rotateAnim, {
      toValue: rotationDegrees.current,
      duration: 300,
      useNativeDriver: true,
    }).start();

    if (onPress) {
      onPress();
    }
  };

  const rotateY = rotateAnim.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 4,
      }}
    >
      <TouchableOpacity onPress={animatePress}>
        <Animated.View
          style={{
            transform: [{ rotateY }],
          }}
        >
          <SvgXml xml={svgContent} width="50" height="50" fill={COLORS.black} />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
}

export default PressableSwapIcons;
