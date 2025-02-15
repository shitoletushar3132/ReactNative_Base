import {Text} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Rupee = ({amount, color = '#000', breakLine = false}) => {
  return (
    <Text className={`text-[${color}] ${breakLine && 'line-through'}`}>
      <FontAwesome name="rupee" size={12} /> {amount}
    </Text>
  );
};

export default Rupee;
