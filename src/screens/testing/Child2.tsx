import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text, View} from 'react-native';

const Child2 = ({label, onclick}) => {
  return (
    <View>
      <Text>{label}</Text>
      <TouchableOpacity style={styles.button} onPress={onclick}>
        <Text>Click it</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {height: 50, width: 80},
});

export default Child2;
