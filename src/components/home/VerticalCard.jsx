import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {ImageUri} from '../../utils/constant';

const VerticalCard = ({product}) => {
  const {id, title, subTitle, quantity, images, variant} = product;
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      className="p-4 mb-5 rounded-3xl bg-white shadow-lg border border-gray-200 items-center w-[48%] "
      onPress={() => navigation.navigate('Details', {id})}>
      {/* Product Image */}
      <View className="relative w-full bg-gray-100 rounded-2xl">
        <Image
          source={{
            uri: images?.[0]
              ? `${ImageUri}/${images[0]}`
              : 'https://via.placeholder.com/150',
          }}
          style={{width: '100%', height: 120, borderRadius: 12}}
          resizeMode="cover"
        />
      </View>

      {variant?.[0] && (
        <View className="w-full flex-row items-center justify-between mt-2 space-x-2">
          <Text className="text-black font-bold text-lg">
            <FontAwesome name="rupee" size={14} /> {variant[0].sellingPrice}
          </Text>
          <Text className="text-gray-400 font-bold line-through text-lg">
            <FontAwesome name="rupee" size={12} /> {variant[0].mrp}
          </Text>
        </View>
      )}

      {/* Product Name & Description */}
      <Text
        className="text-black  font-bold mt-1 w-full "
        numberOfLines={1}
        ellipsizeMode="tail"
        style={{flexWrap: 'wrap'}}>
        {title}
      </Text>
      <Text
        className="w-full text-gray-500 text-sm"
        numberOfLines={1}
        ellipsizeMode="tail"
        style={{flexWrap: 'wrap'}}>
        {subTitle}
      </Text>

      {/* Add to Cart Button */}
      <TouchableOpacity className="w-full bg-[#DD5411] py-2 rounded-2xl mt-3">
        <Text className="text-white font-bold text-center">Add To Cart</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default VerticalCard;
