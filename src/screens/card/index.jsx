import { Text, View } from "react-native";

const Card = ({ title, description }) => (
  <View>
    <View>
      <Text>{title}</Text>
      <Text>{description}</Text>
    </View>
  </View>
);

export default Card;
