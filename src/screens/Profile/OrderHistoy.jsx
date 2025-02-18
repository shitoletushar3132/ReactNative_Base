import {View, Text, Image, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Dimensions} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import OrderCard from '../../components/home/Profile/OrderCard';
import orderData from '../../utils/data/Order.json';
import {getAllOrders} from '../../requests/orders/order';

const OrderHistoy = () => {
  const screenWidth = Dimensions.get('window').width;
  const [orders, setOrders] = useState([]);
  const navigation = useNavigation();
  let allOrder = 0;

  const order = {
    status: 'Success',
    statusCode: 200,
    message: 'Orders fetched',
    data: [
      {
        _id: '67ac295796d06d192ef92a8b',
        products: [
          {
            _id: '67ac290396d06d192ef92a70',
            productId: '674ee05be88da25a8fe78706',
            productQuantity: '200 gm',
            discount: 0,
            totalPrice: 495,
            quantity: 1,
            userId: '67ab31ce96d06d192ef926da',
            productTitle: 'Pro HN Nephro',
            productImage: 'productImg_ea38b2af-8150-42c2-8860-b077cf2e771b.png',
            productVariant: {
              value: 200,
              unit: 'gm',
              variantId: '6944',
              mrp: 495,
              discount: 0,
              sellingPrice: 495,
              specialPrice: 0,
              _id: '674ee0c8e88da25a8fe78808',
            },
            productCatagory: 'Booster',
            __v: 0,
          },
        ],
        order_id: 'order_PufrJMgzjB9HpY',
        totalPrice: 495,
        coupon: null,
        discount: null,
        paymentStatus: 'failed',
        paymentMethod: 'Online',
        userId: '67ab31ce96d06d192ef926da',
        address: {
          streetName1: 'varvand',
          streetName2: 'pune',
          city: 'pune',
          pincode: '412215',
          state: 'maharastra',
          fullName: 'tushar',
          phone: '8767699855',
          addressId: '8563',
          _id: '67ac295296d06d192ef92a84',
        },
        date: '2025-02-12T04:53:43.963Z',
        charges: [],
        chargeAmount: 0,
        discountType: '',
        orderNumber: 'ODNBS053',
        serialNo: 53,
        __v: 0,
        delivaryStatus: 'Canceled',
      },
    ],
  };
  orderData.map(order => (allOrder += order.items.length));

  const fetchAllOrders = async () => {
    try {
      const res = await getAllOrders(navigation);
      setOrders(res.data.data);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-5 flex-1">
        {/* Header Section */}
        {/* <View className="flex-row justify-between items-center mb-4">
          <Text className="text-lg font-bold">Order History</Text>
        </View> */}

        {/* Order Summary */}
        <View className="mb-4">
          <Text className="text-base font-semibold text-gray-800">
            All ({orders.length})
          </Text>
        </View>

        <View className="h-[470px]">
          <FlatList
            data={
              orders.length > 0
                ? orders
                : Array.from({length: 10}).map(() => order.data[0])
            }
            keyExtractor={(item, index) => item._id || index.toString()}
            renderItem={({item}) => <OrderCard order={order} />}
            contentContainerStyle={{paddingBottom: 40}}
          />
        </View>

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
