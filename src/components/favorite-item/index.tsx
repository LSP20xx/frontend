import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles';

function FavoriteItem({ title, address, imageSrc, onPress }) {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{
            uri: imageSrc,
          }}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.address}>{address}</Text>
        <TouchableOpacity style={styles.linkContainer} onPress={onPress}>
          <Text style={styles.link}>BORRAR</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default FavoriteItem;
