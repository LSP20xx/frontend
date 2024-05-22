import React, { useState } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { styles } from './styles';

function Maps({ navigation, route }) {
  const { coords } = route.params;
  const [selectedLocation, setSelectedLocation] = useState(null);
  let minX;
  let maxX;
  let minY;
  let maxY;
  minX = coords.lat;
  maxX = coords.lat;
  minY = coords.lng;
  maxY = coords.lng;
  minX = Math.min(minX, coords.lat);
  maxX = Math.max(maxX, coords.lat);
  minY = Math.min(minY, coords.lng);
  maxY = Math.max(maxY, coords.lng);
  const midX = (minX + maxX) / 2;
  const midY = (minY + maxY) / 2;
  const deltaX = maxX - minX;
  const deltaY = maxY - minY;

  const initialRegion = {
    latitude: midX,
    longitude: midY,
    latitudeDelta: deltaX,
    longitudeDelta: deltaY,
  };

  const onHandlerPickLocation = (event) => {
    setSelectedLocation({
      lat: event.nativeEvent.coordinate.latitude,
      lng: event.nativeEvent.coordinate.longitude,
    });
  };

  return (
    <MapView
      initialRegion={initialRegion}
      style={styles.container}
      onPress={onHandlerPickLocation}
      minZoomLevel={8}
    >
      {selectedLocation ? (
        <Marker
          title="Ubicación seleccionada"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      ) : null}
    </MapView>
  );
}

export default Maps;
