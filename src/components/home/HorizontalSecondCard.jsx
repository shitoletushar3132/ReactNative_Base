import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {ImageUri} from '../../utils/constant';

const HorizontalSecondCard = ({product}) => {
  console.log(product);
  const {_id, title, subTitle, images, price, discountPrice, variant} = product;
  const {unit, value, sellingPrice, mrp} = variant[0];
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      // className={`flex-row p-3 rounded-xl mx-3 `}
      style={{
        flexDirection: 'row',
        padding: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        width: 264,
        height: 131,
        elevation: 5,
        marginHorizontal: 10,
        margin: 4,
      }}
      onPress={() => navigation.navigate('Details', {id: _id})}>
      {/* Product Image */}

      <View
        className="relative items-center bg-gray-100 rounded-3xl"
        style={{width: 105}}>
        <Image
          source={{uri: `${ImageUri}/${images[0]}`}}
          className="w-24 h-24"
          resizeMode="contain"
        />

        <Text className="text-gray-500 mt-2 text-xs">
          Quantity: {value} {unit}
        </Text>
      </View>

      {/* Text & Details Section */}
      <View className="flex-1 justify-between px-2">
        <View className="">
          <View className="flex-row justify-between">
            <Text className="text-[#DD5411] font-bold ">
              <FontAwesome name="rupee" size={14} /> {sellingPrice}
            </Text>
            <Text className="text-gray-400 font-bold line-through ">
              <FontAwesome name="rupee" size={12} /> {mrp}
            </Text>
          </View>

          <Text className="text-sm font-bold">{title}</Text>
          <Text className="text-xs text-center">{subTitle}</Text>
        </View>

        <TouchableOpacity className=" bg-[#DD5411] py-2 rounded-2xl mt-3">
          <Text className="text-white font-bold text-center">Add To Cart</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export default HorizontalSecondCard;
