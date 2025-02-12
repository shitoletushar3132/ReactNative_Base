import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

const AuthButton = ({
  title,
  onPress,
  bgColor = 'bg-orange-500',
  textColor = 'text-white',
}) => {
  return (
    <TouchableOpacity
      className={`${bgColor} rounded-lg py-3 items-center`}
      style={{backgroundColor: bgColor}}
      onPress={onPress}>
      <Text
        className={`${textColor} text-lg font-semibold`}
        style={{color: textColor}}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default AuthButton;
