import {View, Text} from 'react-native';
import React from 'react';
import Rupee from '../Cart/Rupee';

const BillSummary = ({item}) => {
  return (
    <View className="">
      <View className="flex-row justify-between ">
        <Text className="text-[#737373]  text-lg mb-1">
          {item.productTitle}
        </Text>
        <Text className="text-[#737373] text-lg">
          ₹{item.quantity * item.totalPrice}
        </Text>
      </View>
    </View>
  );
};

export default BillSummary;
