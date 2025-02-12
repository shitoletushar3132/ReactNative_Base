import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

const VerticalCard = ({product}) => {
  const {id, name, description, price, discountPrice, imageUri, quantity} =
    product;
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className="p-4 mt-5 rounded-3xl bg-white shadow-lg border border-gray-200 items-center"
      style={{width: 151}}
      onPress={() => navigation.navigate('Details', {id})}>
      {/* Product Image & Wishlist Icon */}
      <View
        className="relative items-center bg-gray-100 rounded-2xl"
        style={{width: 135}}>
        <Image
          source={require('../../assets/Home/Products/box.png')}
          className="w-24 h-24"
          resizeMode="contain"
        />
        <TouchableOpacity className="absolute top-2 right-2">
          <FontAwesome name="heart-o" size={18} color="#FF6B6B" />
        </TouchableOpacity>
        <Text className="text-gray-500 mt-2 text-sm">Quantity: {quantity}</Text>
      </View>

      {/* Price Section */}
      <View className=" w-full flex-row items-center justify-between mt-2 space-x-2">
        <Text className="text-black font-bold text-lg">
          <FontAwesome name="rupee" size={14} /> {discountPrice}
        </Text>
        <Text className="text-gray-400 font-bold line-through text-lg">
          <FontAwesome name="rupee" size={12} /> {price}
        </Text>
      </View>

      {/* Product Name & Description */}
      <Text className="text-black text-sm font-bold mt-1 w-full">{name}</Text>
      <Text className="w-full text-center text-gray-500 text-xs">
        {description}
      </Text>

      {/* Add to Cart Button */}
      <TouchableOpacity className="w-full bg-orange-500 py-2 rounded-2xl mt-3">
        <Text className="text-white font-bold text-center">Add To Cart</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default VerticalCard;
