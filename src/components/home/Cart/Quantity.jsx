import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const Quantity = ({handleQuantityChange,quantity}) => {
  return (
    <View className="flex-row items-center border border-orange-500 rounded-lg justify-around ">
      <TouchableOpacity onPress={() => handleQuantityChange('decrease')}>
        <Text className="text-black text-2xl font-bold">－</Text>
      </TouchableOpacity>
      <Text className="mx-2 text-lg font-bold">{quantity}</Text>
      <TouchableOpacity onPress={() => handleQuantityChange('increase')}>
        <Text className="text-black text-2xl font-bold">＋</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Quantity;
