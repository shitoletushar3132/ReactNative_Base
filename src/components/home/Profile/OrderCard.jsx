import {View, Text} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';

const OrderCard = () => {
  // // {
  //   "status": "Processing",
  //   "orderId": 7483638385,
  //   "date": "4 May 2023",
  //   "items": [
  //     { "name": "Tablet", "quantity": 1, "orderId": 7483638385, "date": "4 May 2023" },
  //     { "name": "Charger", "quantity": 1, "orderId": 7483638385, "date": "4 May 2023" }
  //   ]
  // },
  return (
    <View>
      <AntDesign name="checkcircleo" />
      <MaterialCommunityIcons name="line-scan" />
      <MaterialCommunityIcons name="truck-delivery-outline" />
      <Fontisto name="shopping-basket-remove" />

      <View>
        <View>
          <AntDesign name="checkcircleo" />
        </View>
        <View>{}</View>
        <View></View>
      </View>
    </View>
  );
};

export default OrderCard;
