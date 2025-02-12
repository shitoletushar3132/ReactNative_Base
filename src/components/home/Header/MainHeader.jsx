import {View, Image, Dimensions, TouchableOpacity} from 'react-native';
import React from 'react';
import Header from '../Header';
import SearchBar from '../SearchBar';

const MainHeader = () => {
  const screenWidth = Dimensions.get('window').width;

  return (
    <View className="relative">
      <Image
        source={require('../../../assets/Home/headerBack.png')}
        className="h-60"
        resizeMode="cover"
        style={{width: screenWidth}}
      />
      <View className="absolute inset-0 px-5 mt-8">
        <Header />
        <SearchBar />
      </View>
    </View>
  );
};

export default MainHeader;
