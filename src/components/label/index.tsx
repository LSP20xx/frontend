import { View, Text } from 'react-native';

import { styles } from './styles';

function Label({ children, label, labelStyle, subLabel, subLabelStyle }) {
  return (
    <View style={styles.container}>
      <Text style={{ ...styles.label, ...labelStyle }}>{label}</Text>
      {children}
      {subLabel ? (
        <Text style={{ ...styles.subLabel, ...subLabelStyle }}>{subLabel}</Text>
      ) : null}
    </View>
  );
}

export default Label;
