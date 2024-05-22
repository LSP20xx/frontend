import { useEffect } from 'react';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { FavoriteItem } from '../../components/index';
import { getFavorites, removeFromFavorites } from '../../store/actions';
import { styles } from './styles';

function Favorites() {
  const dispatch = useDispatch();
  const { favoritePlaces } = useSelector((state) => state.favorites);

  useEffect(() => {
    dispatch(getFavorites());
  }, []);

  const onPress = (id) => {
    dispatch(removeFromFavorites(id));
  };

  const renderFavoriteItem = ({ item }) => (
    <FavoriteItem
      title={item.title}
      address={item.address}
      imageSrc={item.imageSrc}
      onPress={() => onPress(item.id)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.sectionTitle}>Favoritos</Text>
      {favoritePlaces.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyMessage}>
            Todavía no se agregaron lugares a favoritos.
          </Text>
        </View>
      ) : (
        <FlatList
          data={favoritePlaces}
          renderItem={renderFavoriteItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </SafeAreaView>
  );
}

export default Favorites;
