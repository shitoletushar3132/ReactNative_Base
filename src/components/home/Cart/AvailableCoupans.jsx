import {View, Text, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getCoupons} from '../../../requests/cart/addCart';
import {useNavigation} from '@react-navigation/native';
import {ActivityIndicator} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';

const AvailableCoupans = ({selectedCoupon, setSelectedCoupon}) => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(selectedCoupon?._id); // Track applied coupon
  const navigation = useNavigation();

  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const res = await getCoupons(navigation);
      setCoupons(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const applyCoupon = coupon => {
    setAppliedCoupon(coupon._id);
    setSelectedCoupon(coupon); // Pass selected coupon to parent
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setSelectedCoupon(null); // Remove coupon from parent
  };

  if (loading) {
    return (
      <View className="p-5 pt-10">
        <Text className="text-xl font-bold mb-4">Available Coupons</Text>
        <ActivityIndicator color="#ff8000" />
      </View>
    );
  }

  return (
    <View className="p-5 pt-10">
      <Text className="text-xl font-bold mb-4">Available Coupons</Text>
      {coupons.length > 0 ? (
        coupons.map(coupon => (
          <View key={coupon._id} className="mb-3 p-3 border rounded">
            <View className="flex-row gap-x-3">
              <Text className="text-lg font-semibold">{coupon.coupon}</Text>
              <Text className="ml-3 bg-gray-200 rounded-xl text-center px-2 py-1">
                {coupon.discount}% off
              </Text>
            </View>

            <Text className="text-slate-400 flex-row items-center">
              <AntDesign name="exclamationcircleo" size={15} />
              <Text className="m-3">
                Coupon applicable for bill amount above ₹{coupon.minimumAmount}
              </Text>
            </Text>

            {/* Apply/Remove Button */}
            {appliedCoupon === coupon._id ? (
              <TouchableOpacity
                onPress={removeCoupon}
                className="mt-2 bg-red-500 p-2 rounded-lg">
                <Text className="text-white text-center">Remove</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => applyCoupon(coupon)}
                className="mt-2 bg-green-500 p-2 rounded-lg">
                <Text className="text-white text-center">Apply</Text>
              </TouchableOpacity>
            )}
          </View>
        ))
      ) : (
        <Text>No available coupons</Text>
      )}
    </View>
  );
};

export default AvailableCoupans;
