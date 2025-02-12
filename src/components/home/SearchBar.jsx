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
        className="flex-row items-center bg-transparent border border-white rounded-lg px-4 py-3"
        onPress={() => navigation.navigate('Search')}>
        <Fontisto name="search" size={18} color={'#fff'} className="mr-2" />
        <Text className="text-white text-base flex-1">Search Product</Text>
        <FontAwesome
          name="microphone"
          size={18}
          color={'white'}
          className="ml-2"
        />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
