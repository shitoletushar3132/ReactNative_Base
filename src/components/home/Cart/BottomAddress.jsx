import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const BottomAddress = ({
  address,
  selectedId,
  setSelectedAddress,
  refRBSheet,
}) => {
  return (
    <TouchableOpacity
      className={`p-3 border-2 border-gray-300 rounded-lg mt-4 ${
        selectedId == address.addressId && 'border-sky-500'
      }`}
      onPress={() => {
        setSelectedAddress(address), refRBSheet?.current?.close();
      }}>
      <View className="flex-row items-start space-x-3">
        <MaterialIcons name="location-on" size={24} color={'gray'} />
        <View className="flex-1">
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-bold text-gray-800">
              {address.fullName}
            </Text>
            <Text className="font-bold text-gray-800">
              Pincode: {address.pincode}
            </Text>
          </View>

          <Text className="text-gray-700 flex-wrap">
            Address: {address.streetName1}, {address.streetName2},{' '}
            {address.city}, {address.state}, {address.pincode}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default BottomAddress;
