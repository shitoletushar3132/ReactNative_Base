import {
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Products from '../../utils/data/home.json';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Divider from '../../components/home/BillSummary/Divider';
import {TextInput} from 'react-native-gesture-handler';

const BillSummary = () => {
  const [paymentMode, setPaymentMode] = useState(1);
  let sum = 0;

  Products.map(product => (sum += +product.price));
  const address = {
    street1: 'varvand',
    street2: 'ganeshwadi',
    city: 'pune',
    state: 'maharastra',
    pinCode: '412215',
  };
  const paymentOptions = [
    {id: 1, title: 'Digital Payment'},
    {id: 2, title: 'Cash on Delivery'},
    {id: 3, title: 'Partial Payment'},
  ];
  return (
    <SafeAreaView className="flex-1 bg-white">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1">
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            keyboardShouldPersistTaps="handled">
            <View className="p-5">
              {/* billSummary */}
              <View>
                <Text className="mb-3 font-bold text-lg">Bill Summery</Text>

                <View>
                  {Products.map(product => (
                    <View className="flex-row justify-between" key={product.id}>
                      <Text className="text-[#737373]">{product.name}</Text>
                      <Text className="text-[#737373] ">
                        <FontAwesome name="rupee" size={12} /> {product.price}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>

              <Divider />

              {/* TotalPice */}
              <View className="gap-y-2 mt-1">
                <View className="flex-row justify-between ">
                  <Text className="text-[#737373]">Total Charges</Text>
                  <Text className="text-[#737373]">
                    <FontAwesome name="rupee" size={12} /> 0
                  </Text>
                </View>
                <View className="flex-row justify-between">
                  <Text className="font-bold">Total Price</Text>
                  <Text className="font-bold">
                    <FontAwesome name="rupee" size={12} /> {sum}
                  </Text>
                </View>

                <View className="flex-row justify-between">
                  <Text className="text-[#3BAA04]">Coupon Discount</Text>
                  <Text className="text-[#737373]">
                    <FontAwesome name="rupee" size={12} /> {0}
                  </Text>
                </View>
              </View>

              <Divider />
              {/* To Be paid */}
              <View>
                <View className="flex-row justify-between">
                  <Text className="font-bold">To Be Paid</Text>
                  <Text className=" font-bold">
                    <FontAwesome name="rupee" size={12} /> {sum}
                  </Text>
                </View>
                <View className="mt-4">
                  <Text>Enter Coupon</Text>
                  <View className="flex-row mt-3">
                    <View className="border border-[#737373] flex-1 rounded-l-xl">
                      <TextInput
                        placeholder="Enter Coupon"
                        placeholderTextColor="#737373"
                      />
                    </View>
                    <TouchableOpacity className="flex-row items-center w-[118px] justify-center bg-[#DD5411] rounded-r-xl">
                      <Text>Apply</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {/* Address */}
              <View className="mt-4 border py-2 px-2 rounded-lg border-[#737373]">
                <View className="mb-2 flex-row justify-between">
                  <Text className="font-bold">Address</Text>
                  <TouchableOpacity className="px-2 py-1 border border-[#DD5411] rounded-lg">
                    <Text className="text-[#DD5411]">View All</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <Text className="mb-2">
                    {address.city} {address.pinCode}
                  </Text>

                  <Text>
                    Address : {address.street1}, {address.street2},{' '}
                    {address.city},{address.state}, {address.pinCode}
                  </Text>
                </View>
              </View>
              {/* payment */}
              <View>
                <Text className="my-4 font-bold">Payment Option</Text>
                {paymentOptions.map(payment => (
                  <TouchableOpacity
                    key={payment.id}
                    onPress={() => setPaymentMode(payment.id)}
                    className={`border border-[#CFCDCD] ${
                      paymentMode === payment.id ? 'bg-[#008CFF]' : 'bg-white'
                    } rounded-lg mb-3 py-3 flex-row px-3 items-center`}>
                    <FontAwesome
                      name={
                        paymentMode === payment.id ? 'dot-circle-o' : 'circle-o'
                      }
                      size={16}
                      color={'#008CFF'}
                    />
                    <Text className="ml-4">{payment.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <View className="mt-4 bg-[#FF8000] py-3 rounded-lg">
                <TouchableOpacity>
                  <Text className="text-center text-white font-bold">
                    Place An Order
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default BillSummary;
