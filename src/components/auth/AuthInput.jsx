import React, {useState} from 'react';
import {View, TextInput, Text} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Icon from '../Icon';

const AuthInput = ({
  placeholder,
  iconName,
  libName,
  secureTextEntry = false,
  height = 11,
  onChangeText,
  border = '#A3A3A3',
  focusBorder = 'black',
}) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <View
      className={`flex-row items-center border h-[${height}px] rounded-lg px-3`}
      style={{borderColor: isFocused ? focusBorder : border}}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#A3A3A3"
        secureTextEntry={secureTextEntry}
        className="flex-1 ml-2 text-black"
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <Icon libName={libName} iconName={iconName} size={18} color="#A3A3A3" />
    </View>
  );
};

export default AuthInput;
