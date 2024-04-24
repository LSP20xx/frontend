import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../../components";
import { getStyles } from "./styles";
import { useTheme } from "../../context/ThemeContext";

const Card = ({ navigation }) => {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} showBackButton={false} isHome={true} />
    </SafeAreaView>
  );
};

export default Card;
