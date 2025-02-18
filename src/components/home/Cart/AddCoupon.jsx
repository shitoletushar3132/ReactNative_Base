import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import {getApplyCoupon} from '../../../requests/cart/addCart';
import {useNavigation} from '@react-navigation/native';
import {AppContext} from '../../../contextProvider/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const AddCoupon = ({setCouponData, total}) => {
  const {coupon, setCoupon} = useContext(AppContext);
  const navigation = useNavigation();
  const [error, setError] = useState('');

  // Function to get coupon from AsyncStorage when the component mounts
  useEffect(() => {
    const fetchCoupon = async () => {
      try {
        const storedCoupon = await AsyncStorage.getItem('coupon');
        if (storedCoupon) {
          setCoupon(storedCoupon);
        }
      } catch (error) {
        console.log('Error fetching coupon from AsyncStorage:', error);
      }
    };

    fetchCoupon();
  }, []);

  const applyCoupon = async () => {
    try {
      if (coupon) {
        const res = await getApplyCoupon({couponName: coupon, navigation});
        if (res.data.data.minimumAmount <= total) {
          setCouponData(res.data.data);
        } else {
          setError(
            `You need ₹${res.data.data.minimumAmount} more in your bill amount to use this coupon`,
          );
        }
      } else {
        setError('Enter a Valid Coupon');
      }
      await AsyncStorage.setItem('coupon', coupon);
    } catch (error) {
      setError(error.response?.data?.message);
      console.log(error.response?.data?.message);
    }
  };

  return (
    <View>
      <View className="p-4 flex-row items-center">
        <View className="border border-gray-300 rounded-l-lg  px-3 flex-1">
          <TextInput
            placeholder="Coupon"
            value={coupon}
            placeholderTextColor="#000"
            onChangeText={text => setCoupon(text)} // Use onChangeText for TextInput
            className="flex-1 py-2 text-lg text-gray-700"
          />
        </View>
        <TouchableOpacity
          className="bg-blue-500 px-4 py-3 rounded-r-lg"
          onPress={() => applyCoupon()}>
          <Text className="text-white font-bold">Apply</Text>
        </TouchableOpacity>
      </View>
      <Text className="text-sm text-red-500">{error}</Text>
    </View>
  );
};

export default AddCoupon;
