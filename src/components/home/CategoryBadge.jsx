import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const CategoryBadge = ({category}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className="mx-1 rounded-3xl bg-[#EDEDED]"
      onPress={() => navigation.navigate('CategoryFilter', {category})}>
      <Text className="px-5 py-2">{category}</Text>
    </TouchableOpacity>
  );
};

export default CategoryBadge;
