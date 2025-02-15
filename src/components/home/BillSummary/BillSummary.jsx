import {View, Text} from 'react-native';
import React from 'react';
import Rupee from '../Cart/Rupee';

const BillSummary = ({itemTotal, deliveryCharge, toPay}) => {
  return (
    <View className="p-1">
      <View className="flex-row justify-between ">
        <Text className="text-[#737373] font-bold text-lg mb-2">
          Item Total
        </Text>
        <Text className="text-[#737373] font-bold text-lg">
          <Rupee amount={itemTotal} />
        </Text>
      </View>
      <View className="flex-row justify-between mb-3">
        <Text className="text-[#737373] font-bold text-lg">
          Delivery Charge
        </Text>

        <Text className="text-[#737373] font-bold text-lg">
          + <Rupee amount={deliveryCharge} />
        </Text>
      </View>
      <View className="flex-row justify-between border-t border-[#737373] border-dashed ">
        <Text className="text-[#000] font-bold text-lg pt-4">To Pay</Text>
        <Text className="text-[#737373] font-bold text-lg">
          <Rupee amount={toPay} />
        </Text>
      </View>
    </View>
  );
};

export default BillSummary;
