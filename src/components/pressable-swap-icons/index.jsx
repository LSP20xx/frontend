import React, { useRef } from "react";
import { View, TouchableOpacity, Animated } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { COLORS } from "../../constants";

const AnimatedIcon = Animated.createAnimatedComponent(FontAwesome);

const PressableSwapIcons = ({ onPress }) => {
  // Usamos useRef para mantener el valor actual de la rotación en grados.
  const rotationDegrees = useRef(0);

  // Valor animado para controlar la rotación.
  const rotateAnim = useRef(new Animated.Value(0)).current;

  // Función para iniciar la animación de rotación.
  const animatePress = () => {
    // Calculamos los nuevos grados de rotación: sumamos 180 para cada clic.
    rotationDegrees.current += 180;

    // Iniciamos la animación hacia los nuevos grados de rotación.
    Animated.timing(rotateAnim, {
      toValue: rotationDegrees.current,
      duration: 300,
      useNativeDriver: true,
    }).start();
    if (onPress) {
      onPress();
    }
  };

  // Interpolamos el valor animado para obtener la rotación en el eje Y como una cadena de texto.
  const rotateY = rotateAnim.interpolate({
    inputRange: [0, 360], // Asumimos un rango de entrada que cubre una rotación completa para simplificar.
    outputRange: ["0deg", "360deg"], // Mapeamos este rango a grados de rotación.
    extrapolate: "extend", // Permitimos valores fuera del rango de entrada.
  });

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 4,
      }}
    >
      <TouchableOpacity onPress={animatePress}>
        <AnimatedIcon
          name="exchange"
          size={16}
          color={COLORS.primaryLight}
          style={{
            // Aplicamos la transformación de rotación en Y usando la interpolación.
            transform: [{ rotateY: rotateY }],
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default PressableSwapIcons;
