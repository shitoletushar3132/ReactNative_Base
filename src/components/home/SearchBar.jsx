import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SearchBar = () => {
  const navigation = useNavigation();
  return (
    <View className="p-5">
      <TouchableOpacity
        className="flex-row items-center bg-white border border-[#002140] rounded-2xl pl-7 py-3.5 shadow-lg shadow-slate-800"
        onPress={() => navigation.navigate('Search')}>
        <Fontisto name="search" size={16} color={'#002140'} className="mr-2" />
        <Text className="text-[#002140] text-base flex-1 ml-4 font-[500]">
          Search Product
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;
