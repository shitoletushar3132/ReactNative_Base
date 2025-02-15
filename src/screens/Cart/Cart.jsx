import {
  View,
  Text,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Products from '../../utils/data/home.json';
import {ScrollView} from 'react-native-gesture-handler';
import CartCard from '../../components/home/Cart/CartCard';
import {useNavigation} from '@react-navigation/native';
import BillSummary from '../../components/home/BillSummary/BillSummary';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RBSheet from 'react-native-raw-bottom-sheet';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import BottomAddress from '../../components/home/Cart/BottomAddress';
import AddCoupon from '../../components/home/Cart/AddCoupon';
import AvailableCoupans from '../../components/home/Cart/AvailableCoupans';

const Cart = () => {
  const [showAddress, setShowAddress] = useState(false);
  const [applyCoupon, setApplyCoupon] = useState(false);
  const [showReferralCode, setShowReferralCode] = useState(false);
  const navigation = useNavigation();

  const refRBSheet = useRef();
  const refApplyCupon = useRef();

  let sum = 0;
  Products.map(product => (sum += +product.discountPrice));

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1">
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={{flexGrow: 1, paddingBottom: 20}}>
              <TouchableOpacity
                className="px-5 py-3 rounded-b-xl bg-white flex-row justify-between"
                style={styles.shadowContainer}
                onPress={() => refRBSheet.current.open()}>
                <View className="flex-row items-center justify-between">
                  <MaterialCommunityIcons
                    name="navigation-variant"
                    size={28}
                    color={'#e01b24'}
                  />
                  <Text className="text-xl ml-2 text-[#737373]">
                    22, Demo...
                  </Text>
                </View>
                <FontAwesome5 name="chevron-down" />
              </TouchableOpacity>
              {/* Wrapper for all content */}
              <View className="px-5">
                {/* Address */}

                {/* Review Your Order */}
                <View>
                  <Text className="font-bold text-lg my-3">
                    Review your order
                  </Text>
                  <View
                    className="px-5 py-5 rounded-xl bg-white"
                    style={styles.shadowContainer}>
                    {Products.map((product, index) => (
                      <CartCard key={index} product={product} index={index} />
                    ))}
                  </View>
                </View>

                {/* Bill Summary */}
                <View>
                  <Text className="font-bold text-lg my-3">Bill Summary</Text>
                  <View
                    className="px-5 py-5 rounded-xl bg-white"
                    style={styles.shadowContainer}>
                    <BillSummary
                      itemTotal={sum}
                      deliveryCharge={18}
                      toPay={sum + 18}
                    />
                  </View>
                </View>

                {/* Referral Code, Gift Coupon, Apply Coupon */}

                <View
                  className=" px-5 py-2 rounded-xl bg-white mt-3"
                  style={styles.shadowContainer}>
                  <TouchableOpacity className="flex-row items-center justify-between">
                    <Text className="font-bold text-lg my-3">
                      Apply A Referral Code
                    </Text>
                    <FontAwesome5 name="chevron-down" />
                  </TouchableOpacity>
                </View>

                <View
                  className=" px-5 py-2 rounded-xl bg-white mt-3"
                  style={styles.shadowContainer}>
                  <TouchableOpacity
                    className="flex-row items-center justify-between"
                    onPress={() => setApplyCoupon(prev => !prev)}>
                    <Text className="font-bold text-lg my-3">
                      Apply A Gift Coupon
                    </Text>
                    <FontAwesome5 name="chevron-down" />
                  </TouchableOpacity>
                  {applyCoupon && <AddCoupon />}
                </View>

                <View
                  className=" px-5 py-2 rounded-xl bg-white mt-3"
                  style={styles.shadowContainer}>
                  <TouchableOpacity
                    onPress={() => refApplyCupon.current.open()}
                    className="flex-row items-center justify-between">
                    <Text className="font-bold text-lg my-3">Apply Coupon</Text>

                    <FontAwesome5 name="chevron-down" />
                  </TouchableOpacity>
                  <Text className="text-[#737373] font-semibold">
                    Save more with coupons available for you
                  </Text>
                </View>

                {/* Make a Payment */}
                <View>
                  <Text className="font-bold text-lg my-3">
                    Payment Options
                  </Text>
                  <View
                    className="px-5 py-2 rounded-xl bg-white"
                    style={styles.shadowContainer}>
                    <Text className="font-bold text-lg my-3">UPI</Text>
                  </View>
                </View>
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>

        <View className="sticky bottom-0 w-full bg-white p-4">
          <TouchableOpacity className="bg-[#DD5411] py-3 rounded-lg">
            <Text className="text-center text-white font-bold">
              Confirm Your Order
            </Text>
          </TouchableOpacity>
        </View>

        <RBSheet
          ref={refRBSheet}
          height={200} // ✅ Set a fixed height instead of animating it
          openDuration={250}
          closeDuration={250}
          useNativeDriver={true} // ✅ Keep it true but don't animate height
          customStyles={{
            container: {},
          }}>
          <BottomAddress />
        </RBSheet>

        <RBSheet
          ref={refApplyCupon}
          height={150} // ✅ Set a fixed height instead of animating it
          openDuration={250}
          closeDuration={250}
          useNativeDriver={true} // ✅ Keep it true but don't animate height
          customStyles={{
            container: {},
          }}>
          <AvailableCoupans />
        </RBSheet>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  shadowContainer: {
    elevation: 4,
    shadowColor: '#616161',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#3b82f6', // blue-500
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Cart;
