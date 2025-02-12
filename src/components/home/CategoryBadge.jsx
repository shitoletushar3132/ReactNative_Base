import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const CategoryBadge = ({navigation, category}) => {
  return (
    <TouchableOpacity className="mx-2 rounded-3xl bg-[#EDEDED]">
      <Text className="px-5 py-2">{category}</Text>
    </TouchableOpacity>
  );
};

export default CategoryBadge;
