import {View, Text, Image, FlatList} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import OrderCard from '../../components/home/Profile/OrderCard';
import orderData from '../../utils/data/Order.json';

const OrderHistoy = () => {
  const screenWidth = Dimensions.get('window').width;
  const navigation = useNavigation();
  let allOrder = 0;

  orderData.map(order => (allOrder += order.items.length));

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-5 flex-1">
        {/* Header Section */}
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-lg font-bold">Order History</Text>
          <Text className="text-sm text-gray-600">Last Month</Text>
        </View>

        {/* Order Summary */}
        <View className="mb-4">
          <Text className="text-base font-semibold text-gray-800">
            All (22)
          </Text>
        </View>

        {/* Order List */}
        {/* <FlatList
          data={OrderCard}
          keyExtractor={item => item.orderId}
          renderItem={({item}) => <OrderCard order={item} />}
        /> */}

        <OrderCard />

        {/* Bottom Image (Properly Positioned) */}
        <View className="mt-auto absolute bottom-0">
          <Image
            source={require('../../assets/profile/Bottom.png')}
            className="h-[239px]"
            resizeMode="cover"
            style={{width: screenWidth}}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OrderHistoy;
