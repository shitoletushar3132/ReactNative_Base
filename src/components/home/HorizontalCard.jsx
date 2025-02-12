import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {useNavigation} from '@react-navigation/native';

const HorizontalCard = ({navigate, product}) => {
  const {id, name, discount, color, imageUri} = product;
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      className={`flex-row p-3 rounded-lg mx-3 `}
      style={{width: 235, height: 104, backgroundColor: color}}
      onPress={() => navigation.navigate('Details', {id})}>
      {/* Text & Details Section */}
      <View className="flex-1 justify-between ">
        <View className="">
          <Text className=" ">{name}</Text>

          <View className="flex-row items-center gap-1  ">
            <EvilIcons name="check" size={16} />
            <Text className="font-semibold">Get {discount}% off</Text>
          </View>
        </View>

        <View className="p-4 flex-row items-start justify-start">
          <TouchableOpacity className=" bg-white px-3 py-2 rounded-lg">
            <Text className="text-black text-sm font-semibold">Shop Now</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Product Image */}
      <View className="w-24 h-full items-center justify-center ">
        <Image
          source={require('../../assets/Home/Products/box.png')}
          className="w-full h-full"
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  );
};

export default HorizontalCard;
