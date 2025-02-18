import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useNavigation} from '@react-navigation/native';
import {ImageUri} from '../../../utils/constant';

const OrderCard = ({order}) => {
  const navigation = useNavigation();
  console.log(order);
  const {
    date,
    totalPrice,
    paymentStatus,
    delivaryStatus,
    products,
    address,
    order_id,
  } = order.data[0];

  // Format the date
  const formattedDate = `${new Date(date)
    .getDate()
    .toString()
    .padStart(2, '0')}/${(new Date(date).getMonth() + 1)
    .toString()
    .padStart(2, '0')}/${new Date(date).getFullYear()}`;

  return (
    <TouchableOpacity
      className="border border-slate-200 p-2 rounded-lg mb-3"
      onPress={() => {
        navigation.navigate('OrderDetail', {order_id, order});
      }}>
      <View className="flex-row">
        <View className="flex justify-center rounded-xl">
          <Image
            source={{uri: `${ImageUri}/${products[0].productImage}`}}
            height={50}
            width={50}
            className="rounded-xl"
          />
        </View>

        <View className="flex-col ml-4 gap-y-3">
          <Text className="text-center">
            {products[0].productTitle} & {products.length} items ordered
          </Text>
          <View className="flex-row justify-between">
            <Text>{delivaryStatus}</Text>
            <Text className="bg-gray-200 px-2 rounded-xl">{formattedDate}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default OrderCard;
