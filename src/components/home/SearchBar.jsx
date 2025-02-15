import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SearchBar = () => {
  const navigation = useNavigation();
  return (
    <View className="mt-12">
      <TouchableOpacity
        className="flex-row items-center bg-white border border-white rounded-lg pl-7 py-3"
        style={{elevation: 3}}
        onPress={() => navigation.navigate('Search')}>
        <Fontisto name="search" size={12} color={'#000'} className="mr-2" />
        <Text className="text-black text-base flex-1">Search Product</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
