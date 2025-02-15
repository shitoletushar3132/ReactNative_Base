import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const BottomAddress = () => {
  return (
    <View className="p-5">
      <View className="mb-5">
        <Text className="text-xl font-bold">Choose a delivery Address</Text>
      </View>
      <View className="">
        <TouchableOpacity
          className="flex-row items-center gap-x-2"
          onPress={() => {}}>
          <FontAwesome name="plus-circle" size={16} color={'#DD5411'} />
          <Text className="text-lg font-bold text-[#DD5411]">
            Add An Address
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row items-center p-3 border-2 border-sky-500 rounded-lg mt-4 gap-x-3">
        <MaterialIcons name="location-on" size={24} color={'gray'} />
        <View>
          <Text className="font-bold text-lg">Name:Demo</Text>
          <Text>22, Demo....</Text>
        </View>
      </View>
    </View>
  );
};

export default BottomAddress;
