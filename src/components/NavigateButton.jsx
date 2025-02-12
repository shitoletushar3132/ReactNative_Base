import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const NavigateButton = ({title, navigation, route, color = '#6B7280'}) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(route)}>
      <Text style={{color: color, fontWeight: '500'}}>{title}</Text>
    </TouchableOpacity>
  );
};

export default NavigateButton;
