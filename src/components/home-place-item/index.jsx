import React from 'react';
import { Image, Text, TouchableOpacity} from 'react-native';

import { styles } from './styles';

const HomePlaceItem = ({ imageSrc, image, title }) => {
    <TouchableOpacity style={styles.placesContainer}>
        <Image source={{
                uri: imageSrc,
            }} style={image} />
        <Text style={title}>{title}</Text>
    </TouchableOpacity>
}

export default HomePlaceItem;