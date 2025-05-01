import {memo} from 'react';
import {Text, View} from 'react-native';

export const Child = memo(
  ({label, onclick}: {label: string; onclick: () => void}) => {
    const array = [1, 2, 3];
    array.push(9);
    const result = array.reduce((acc, num) => num + acc, 0);

    for (const num of array) {
      console.log(num);
    }

    const res = array.map(n => n * 2);
    console.log('MAP = ', res);

    console.log('Lable render', result);

    const sliceCheck = ['0', '1', '2', '5', '9'];
    console.log(sliceCheck.slice(0, 3));

    return (
      <View>
        <Text>{label}</Text>
      </View>
    );
  },
);

export default Child;
