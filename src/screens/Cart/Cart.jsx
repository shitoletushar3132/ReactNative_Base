import {
  View,
  Text,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
  Platform,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import CartCard from '../../components/home/Cart/CartCard';
import {useNavigation} from '@react-navigation/native';
import BillSummary from '../../components/home/BillSummary/BillSummary';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import RBSheet from 'react-native-raw-bottom-sheet';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import BottomAddress from '../../components/home/Cart/BottomAddress';
import AddCoupon from '../../components/home/Cart/AddCoupon';
import AvailableCoupans from '../../components/home/Cart/AvailableCoupans';
import {AppContext} from '../../contextProvider/AppContext';
import {getAllCart, getAllCharges} from '../../requests/cart/addCart';
import {calculateDiscount} from '../../utils/helper/calculateDiscount';
import {handlePayment} from '../../utils/helper/handlePayment';

const Cart = () => {
  const {user, cartRefreshData} = useContext(AppContext);
  const [selectedAddress, setSelectedAddress] = useState(user?.address[0]);
  const [loading, setLoading] = useState(true);
  const [applyCoupon, setApplyCoupon] = useState(false);
  const [items, setItems] = useState([]);
  const [couponData, setCouponData] = useState({});
  const navigation = useNavigation();
  const [selected, setSelected] = useState(true);
  const refRBSheet = useRef();
  const refApplyCupon = useRef();
  const [selectCoupon, setSelectedCoupon] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      // setLoading(true);
      try {
        if (user) {
          const [cartRes, chargesRes] = await Promise.all([
            getAllCart(navigation),
            getAllCharges(navigation),
          ]);
          setItems(cartRes.data.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [cartRefreshData, user]);

  if (!user) {
    return (
      <View className="flex-1 bg-white justify-center items-center px-6 py-8">
        <Text className="text-xl font-bold text-gray-700 mb-4 text-center">
          Your Cart Is Empty
        </Text>
        <Image
          source={require('../../assets/Home/cart/noData.png')}
          style={{width: 150, height: 150}}
        />
        <Text className="mt-4 text-gray-500 text-center text-sm">
          Looks like you haven't added anything to your cart yet. Start shopping
          now!
        </Text>
      </View>
    );
  }

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator color={'#ff8000'} size={'large'} />
      </View>
    );
  }

  const total = items.reduce(
    (acc, item) => acc + item.quantity * item.totalPrice,
    0,
  );
  const discountPrice =
    calculateDiscount({
      couponDiscount: selectCoupon?.discount,
      couponDiscountType: selectCoupon?.discountType,
      totalPrice: total,
    }) || 0;

  const ToBePay = total - discountPrice;

  console.log(selectCoupon);
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
                    {selectedAddress?.streetName1},{' '}
                    {selectedAddress?.streetName2}, {selectedAddress?.city},{' '}
                    {selectedAddress?.state?.slice(0, 4)},{' '}
                    {selectedAddress?.pincode}
                    ...
                  </Text>
                </View>
                <FontAwesome5 name="chevron-down" />
              </TouchableOpacity>
              {/* Wrapper for all content */}
              <View className="px-3">
                {/* Address */}

                {/* Review Your Order */}
                <View>
                  <Text className="font-bold text-lg my-3">
                    Review your order
                  </Text>
                  <View
                    className="px-5 py-5 rounded-xl bg-white"
                    style={styles.shadowContainer}>
                    {items.map((item, index) => (
                      <CartCard key={item._id} product={item} index={index} />
                    ))}
                  </View>
                </View>

                {/* Bill Summary */}
                <View>
                  <Text className="font-bold text-lg my-3">Bill Summary</Text>
                  <View
                    className="px-5 py-5 rounded-xl bg-white"
                    style={styles.shadowContainer}>
                    {/* {items.map(item => (
                      <BillSummary item={item} key={item._id} />
                    ))} */}
                    <View className=" ">
                      <View className="flex-row justify-between">
                        <Text className="text-[#000] font-bold text-lg ">
                          Total
                        </Text>
                        <Text className="text-[#000] font-bold text-lg ">
                          ₹{total}
                        </Text>
                      </View>

                      {discountPrice > 0 && (
                        <View className="flex-row justify-between">
                          <Text className="text-[#16A34A] font-bold text-lg">
                            Discount
                          </Text>
                          <Text className="text-[#16A34A] font-bold text-lg">
                            -₹{discountPrice}
                          </Text>
                        </View>
                      )}

                      <View className="flex-row justify-between border-t border-slate-200">
                        <Text className="text-black font-bold text-lg">
                          To Be Pay
                        </Text>
                        <Text className="text-black font-bold text-lg">
                          ₹{ToBePay}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                {/* Referral Code, Gift Coupon, Apply Coupon */}
                {/* 
                <View
                  className=" px-5 py-2 rounded-xl bg-white mt-3"
                  style={styles.shadowContainer}>
                  <TouchableOpacity
                    className="flex-row items-center justify-between"
                    onPress={() => setApplyCoupon(prev => !prev)}>
                    <Text className="font-bold text-lg my-3">
                      Apply A Coupon
                    </Text>
                    <FontAwesome5 name="chevron-down" />
                  </TouchableOpacity>
                  {applyCoupon && (
                    <AddCoupon setCouponData={setCouponData} total={total} />
                  )}
                </View> */}

                <View
                  className=" px-5 py-2 rounded-xl bg-white mt-3"
                  style={styles.shadowContainer}>
                  <TouchableOpacity
                    onPress={() => refApplyCupon.current.open()}
                    className="flex-row items-center justify-between">
                    <Text className="font-bold text-lg my-3">
                      Available Coupons
                    </Text>

                    <FontAwesome5 name="chevron-down" />
                  </TouchableOpacity>
                </View>

                {/* Make a Payment */}
                <TouchableOpacity onPress={() => setSelected(!selected)}>
                  <Text className="font-bold text-lg my-3">
                    Payment Options
                  </Text>

                  <View
                    className="px-5 py-2 rounded-xl bg-white flex-row items-center"
                    style={styles.shadowContainer}>
                    {/* Selection Indicator */}
                    <View className="border border-[#6792f0] p-1 rounded-full mr-2">
                      {selected && (
                        <View className="bg-[#6792f0] p-2 rounded-full"></View>
                      )}
                    </View>

                    {/* Payment Option Text */}
                    <Text className="font-semibold my-3 text-[#6792f0]">
                      Credit Card/Debit Card/UPI Payment
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>

        <View className="sticky bottom-0 w-full bg-white p-4">
          <TouchableOpacity
            className="bg-[#DD5411] py-3 rounded-lg"
            onPress={() =>
              handlePayment({
                products: items,
                totalPrice: total,
                coupon: couponData,
                discountPrice: discountPrice,
                address: selectedAddress,
                charges: [],
                chargeAmount: 0,
                discountType: 0,
              })
            }>
            <Text className="text-center text-white font-bold">
              Process To Pay
            </Text>
          </TouchableOpacity>
        </View>
        <RBSheet
          ref={refRBSheet}
          height={400} // Increase height for better scrolling
          openDuration={250}
          closeDuration={250}
          useNativeDriver={true}
          customStyles={{
            container: {paddingBottom: 10}, // Optional: Avoid content cut-off
          }}>
          <ScrollView
            style={{maxHeight: 350}}
            showsVerticalScrollIndicator={false}>
            <View className="p-5">
              <View className="mb-5">
                <Text className="text-xl font-bold">
                  Choose a delivery Address
                </Text>
              </View>
              <View className="">
                <TouchableOpacity
                  className="flex-row items-center gap-x-2"
                  onPress={() => {}}>
                  <FontAwesome name="plus-circle" size={16} color={'#DD5411'} />
                  <Text className="text-lg font-bold text-[#DD5411]">
                    Add An Address
                  </Text>
                </TouchableOpacity>
              </View>
              {user.address.map(address => (
                <BottomAddress
                  key={address.addressId}
                  address={address}
                  selectedId={selectedAddress?.addressId}
                  setSelectedAddress={setSelectedAddress}
                  refRBSheet={refRBSheet}
                />
              ))}
            </View>
          </ScrollView>
        </RBSheet>

        <RBSheet
          ref={refApplyCupon}
          height={250} // ✅ Set a fixed height instead of animating it
          openDuration={250}
          closeDuration={250}
          useNativeDriver={true} // ✅ Keep it true but don't animate height
          customStyles={{
            container: {},
          }}>
          <AvailableCoupans
            selectedCoupon={selectCoupon}
            setSelectedCoupon={setSelectedCoupon}
          />
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
