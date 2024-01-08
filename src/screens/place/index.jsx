import React, { useState, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import {
  View,
  Image,
  Text,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";

import { useNavigation } from "@react-navigation/native";
import {
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from "expo-location";
import { COLORS } from "../../constants";
import { addToFavorites } from "../../store/actions";
import { styles } from "./styles";
import { MapPreview } from "../../components";
import { URL_MAPS } from "../../utils/maps";
import { addMap, fetchMapFromDatabase } from "../../store/slices/maps.slice";

const Place = () => {
  const navigation = useNavigation();
  const [pickedLocation, setPickedLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [imageUrl, setImageUrl] = useState(null);
  const dispatch = useDispatch();
  const { data, selected } = useSelector((state) => state.places);
  const place = data.find((place) => place.id === selected.id);
  useEffect(() => {
    dispatch(fetchMapFromDatabase(place.id.toString()))
      .unwrap()
      .then((res) => {
        try {
          if (res.rows.length && res.rows.length > 0) {
            const map = res.rows.item(0);
            setImageUrl(map.imageUri);
            setLoadingLocation(false);
          } else {
            dispatch(
              addMap({
                id: place.id.toString(),
                title: place.title,
                address: place.address,
                imageUri: place.address
                  ? URL_MAPS(encodeURIComponent(place.address))
                  : null,
              })
            )
              .unwrap()
              .then((res) => {
                setLoadingLocation(false);
                setImageUrl(
                  place.address
                    ? URL_MAPS(encodeURIComponent(place.address))
                    : null
                );
              })
              .catch((err) => {
                console.log(err);
                setLoadingLocation(true);
              });
          }
        } catch (error) {
          console.log(error);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch, place.id]);

  const verifyPermissions = async () => {
    const { status } = await requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permisos insuficientes",
        "Necesitás dar permisos de localización para usar esta app",
        [{ text: "Ok" }]
      );
      return false;
    }
    return true;
  };

  const onHandlerGetCurrentLocation = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    try {
      const location = await getCurrentPositionAsync({
        timeout: 5000,
      });
      const { latitude, longitude } = location.coords;
      setPickedLocation({
        lat: latitude,
        lng: longitude,
      });
      setLoadingLocation(false);
      navigation.navigate("Mapa", {
        coords: {
          lat: latitude,
          lng: longitude,
        }
      });
    } catch (err) {
      Alert.alert(
        "No se pudo obtener la ubicación",
        "Intente nuevamente más tarde o elija una ubicación en el mapa",
        [{ text: "Ok" }]
      );
      setLoadingLocation(false);
    }
  };

  const onAddToFavorites = () => {
    dispatch(addToFavorites(place));
  };

  return (
    <View style={styles.container}>
      <Image
        resizeMode="cover"
        source={{ uri: place.imageSrc }}
        style={styles.image}
      />
      <View style={styles.textContainer}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.title}>{place.title}</Text>
          <Ionicons
            onPress={onAddToFavorites}
            name="heart"
            size={24}
            color={COLORS.primary}
          />
        </View>
        <Text style={styles.address}>{place.address}</Text>
        <Text style={styles.telephone}>{place.telephone}</Text>
        <View style={styles.buttonContainer}>
          <Button
            style={styles.button}
            onPress={onHandlerGetCurrentLocation}
            title="Mi Ubicación"
            color={COLORS.primary}
          ></Button>
          <View style={{ width: 16 }}></View>

        </View>
        {loadingLocation ? (
          <ActivityIndicator
            size="large"
            color={COLORS.primary}
            style={styles.loading}
          />
        ) : (
          <MapPreview
            location={pickedLocation}
            address={place.address}
            imageUrl={imageUrl}
            style={styles.mapPreview}
          >
            <Text style={styles.noLocationText}>
              No se pudo obtener la ubicación
            </Text>
          </MapPreview>
        )}
      </View>
    </View>
  );
};

export default Place;
