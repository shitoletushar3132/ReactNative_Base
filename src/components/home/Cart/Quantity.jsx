import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const Quantity = ({handleQuantityChange, quantity}) => {
  return (
    <View className="flex-row items-center border border-orange-500 rounded-lg justify-around px-2">
      <TouchableOpacity
        className="z-20"
        onPress={() => handleQuantityChange('decrease')}>
        <Text className="text-black text-3xl font-semibold">－</Text>
      </TouchableOpacity>
      <Text className="mx-2 text-lg font-bold">{quantity}</Text>
      <TouchableOpacity
        className="z-20"
        onPress={() => handleQuantityChange('increase')}>
        <Text className="text-black text-3xl font-semibold">＋</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Quantity;
