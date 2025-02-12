import {View} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const Icon = ({
  libName: IconComponent,
  iconName,
  size = 24,
  color = 'black',
}) => {
  return (
    <View>
      {IconComponent && (
        <IconComponent name={iconName} size={size} color={color} />
      )}
    </View>
  );
};

export default Icon;
