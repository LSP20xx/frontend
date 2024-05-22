import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

function CounterAnimation({ endValue, text }) {
  // Inicializar un estado para almacenar los componentes de texto animado
  const [animatedComponents, setAnimatedComponents] = useState([]);

  useEffect(() => {
    const chars = endValue.toString().split('');
    const animatedChars = chars.map((char, index) => {
      // Si el carácter no es un dígito (por ejemplo, un punto), simplemente lo retornamos.
      if (isNaN(char)) {
        return char;
      }

      // Si es un dígito, lo animamos.
      // Convertir cada dígito a un entero para la animación.
      const targetDigit = parseInt(char, 10);
      let animationStep = 0;

      // Crear un intervalo para animar el dígito de 0 a su valor objetivo.
      const intervalDuration = 500 / (targetDigit + 1); // +1 para asegurar que no dividamos por cero.
      const intervalId = setInterval(() => {
        animationStep++;
        // Actualizar el dígito animado en su posición respectiva.
        setAnimatedComponents((currentComponents) => {
          const newComponents = [...currentComponents];
          newComponents[index] =
            animationStep > targetDigit ? targetDigit : animationStep;
          return newComponents;
        });

        // Detener la animación cuando el dígito alcance su valor objetivo.
        if (animationStep > targetDigit) {
          clearInterval(intervalId);
        }
      }, intervalDuration);

      return '0'; // Iniciar con '0' antes de que comience la animación.
    });

    setAnimatedComponents(animatedChars);

    // Limpieza: asegurarse de que todos los intervalos se despejen al desmontar el componente
    return () => {
      animatedChars.forEach((_, index) => clearInterval(index));
    };
  }, [endValue]);

  return (
    <View style={styles.container}>
      <Text style={styles.num}>{animatedComponents.join('') || 0}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '80%', // Ajusta según sea necesario
    height: 200, // Ajusta según sea necesario
    backgroundColor: '#21242b',
    padding: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius: 10,
    borderBottomWidth: 10,
    borderBottomColor: '#18f98f',
  },
  num: {
    color: '#ffffff',
    fontSize: 36,
    fontWeight: '600',
  },
  text: {
    color: '#e0e0e0',
    fontSize: 16,
  },
});

export default CounterAnimation;
