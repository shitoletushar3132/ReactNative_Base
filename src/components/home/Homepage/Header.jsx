import {View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();
  return (
    <View className="flex-row justify-between p-4">
      <Image
        source={require('../../../assets/Home/homePage/logo.png')}
        style={{width: 80, height: 40}} // Adjusted size for the logo
        resizeMode="contain"
      />

      <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
        <Image
          source={require('../../../assets/Home/homePage/threeLines.png')}
          style={{width: 30, height: 31}} // Size for the menu icon
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
