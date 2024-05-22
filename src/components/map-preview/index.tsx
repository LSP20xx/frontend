import { View, Image } from 'react-native';
import { styles } from './styles';

function MapPreview({ children, address, style, imageUrl }) {
  return (
    <View style={{ ...styles.container, ...style }}>
      {address ? (
        <Image style={styles.mapImage} source={{ uri: imageUrl }} />
      ) : (
        children
      )}
    </View>
  );
}

export default MapPreview;
