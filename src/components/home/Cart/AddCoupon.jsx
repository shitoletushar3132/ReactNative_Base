import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import React from 'react';

const AddCoupon = () => {
  return (
    <View className="p-4 flex-row items-center">
      <View className="border border-gray-300 rounded-l-lg  px-3 flex-1">
        <TextInput
          placeholder="Coupon"
          placeholderTextColor="#000"
          className="flex-1 py-2 text-lg"
        />
      </View>
      <TouchableOpacity className="bg-blue-500 px-4 py-3 rounded-r-lg">
        <Text className="text-white font-bold">Apply</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddCoupon;
