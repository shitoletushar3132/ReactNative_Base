import {
  View,
  Text,
  Image,
  FlatList,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import React from 'react';
import {ImageUri} from '../../utils/constant';

const OrderDetail = ({route}) => {
  const {order_id, order} = route.params;
  console.log(order);
  const {
    orderNumber,
    date,
    totalPrice,
    paymentStatus,
    delivaryStatus,
    products,
    address,
  } = order.data[0];

  // Format the date
  const formattedDate = `${new Date(date)
    .getDate()
    .toString()
    .padStart(2, '0')}/${(new Date(date).getMonth() + 1)
    .toString()
    .padStart(2, '0')}/${new Date(date).getFullYear()}`;

  const orderItems = [
    {id: '1', name: 'Pro HN Nephro, 200 gm', quantity: 1, price: '₹495'},
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <View className="rounded-lg p-4">
          {/* Order Date */}
          <View className="mb-3">
            <Text className="text-lg font-semibold">
              Order ID: {orderNumber}
            </Text>

            <Text className="text-gray-500">{formattedDate}</Text>
          </View>

          {/* ordered Items */}
          <View className="mb-3 border border-gray-200 p-4 rounded-lg">
            <Text className="font-semibold mb-3">Ordered Items</Text>
            {products.map(product => (
              <View key={product._id} className="flex-row mb-2 items-center">
                <Image
                  source={{uri: `${ImageUri}/${product.productImage}`}} // Assuming you have a path for images
                  style={{width: 70, height: 70, marginRight: 10}}
                />
                <View>
                  <Text className="text-sm text-gray-400">
                    {product.productCatagory}
                  </Text>
                  <Text className="font-semibold text-sm">
                    {product.productTitle}, {product.productQuantity}
                  </Text>
                  <Text className="text-sm mb-2 text-gray-400">
                    Qty: {product.quantity}
                  </Text>
                  <Text className=" font-bold">₹{product.totalPrice}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Payment Status */}
          <View className="mb-3 border border-gray-200 p-4 rounded-lg">
            <Text className="font-semibold mb-3"> Order Information</Text>
            <Text className="font-semibold">
              Delivary Status: {delivaryStatus}
            </Text>
            <Text className="font-semibold">
              Payment Status:{' '}
              <Text
                className={
                  paymentStatus === 'failed' ? 'text-red-500' : 'text-green-500'
                }>
                {paymentStatus === 'failed' ? 'Failed' : 'Success'}
              </Text>
            </Text>
          </View>

          {/* Address Details */}
          <View className="mb-3 border border-gray-200 p-4 rounded-lg">
            <Text className="font-semibold mb-3">Shipping Address</Text>

            <View className="flex-row gap-x-1">
              <Text className="font-semibold">Name: </Text>
              <Text>{address.fullName}</Text>
            </View>

            <View className="flex-row gap-x-1">
              <Text className="font-semibold">Phone Number: </Text>
              <Text>{address.phone}</Text>
            </View>

            <View className="flex-row gap-x-1">
              <Text className="font-semibold">Address:</Text>
              <Text>
                {address.streetName1}, {address.streetName2}
              </Text>
            </View>

            <View className="flex-row gap-x-1">
              <Text className="font-semibold">Pincode: </Text>
              <Text>{address.pincode}</Text>
            </View>

            <View className="flex-row gap-x-1">
              <Text className="font-semibold">City: </Text>
              <Text>{address.city}</Text>
            </View>

            <View className="flex-row gap-x-1">
              <Text className="font-semibold">State: </Text>
              <Text>{address.state}</Text>
            </View>
          </View>

          {/* Total Price */}

          {/* Order Summary */}
          <View className="border border-gray-200 p-4 rounded-lg bg-white">
            <Text className="font-semibold mb-3">Order Summary</Text>

            {/* Table Header */}
            <View className="flex-row bg-gray-100 p-2">
              <Text className="w-1/6">Sl No.</Text>
              <Text className="w-1/2">Item</Text>
              <Text className="w-1/6 text-center">Qty</Text>
              <Text className="w-1/6 text-right">Price</Text>
            </View>

            {/* Table Rows */}
            {products.map((product, index) => (
              <View
                key={product._id}
                className="flex-row p-2 border-b border-gray-200">
                <Text className="w-1/6">{index + 1}</Text>
                <Text className="w-1/2">{product.productTitle}</Text>
                <Text className="w-1/6 text-center">{product.quantity}</Text>
                <Text className="w-1/6 text-right">₹{product.totalPrice}</Text>
              </View>
            ))}

            {/* Total Row */}
            <View className="flex-row p-2 border-t border-gray-200 mt-2">
              <Text className="w-3/4 font-bold">Total</Text>
              <Text className="w-1/4 text-right font-bold text-green-600">
                ₹
                {products.reduce((sum, product) => sum + product.totalPrice, 0)}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderDetail;
