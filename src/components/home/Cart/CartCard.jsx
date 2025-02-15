import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Quantity from './Quantity';
import Rupee from './Rupee';
import truncateText from '../../../utils/helper/truncateText';

const CartCard = ({product, index}) => {
  const [quantity, setQuantity] = useState(1);
  const {
    name,
    discount,
    description,
    color,
    price,
    discountPrice,
    imageUri,
    inStock,
  } = product;
  const size = 250;

  const handleQuantityChange = type => {
    if (type === 'increase') {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const truncatedName = truncateText(name, 10);

  console.log(price, discountPrice);
  return (
    <View
      className={`flex-row items-center py-1  ${
        index == 0 ? 'border-0' : 'border-t'
      } border-gray-300 border-dashed`}>
      <View className="flex-row items-center">
        <View className="relative items-center  justify-center">
          <Image
            source={require('../../../assets/Home/Products/box.png')}
            className="w-16 h-20"
            resizeMode="contain"
          />
        </View>

        <View>
          <Text className="font-semibold mb-1">{truncatedName}</Text>
          <Text className="text-[#a7a7a4] text-md">
            {size} GM X {quantity}
          </Text>
        </View>
      </View>

      <View className="mx-8">
        <Quantity
          handleQuantityChange={handleQuantityChange}
          quantity={quantity}
        />
      </View>

      <View>
        <Text className="font-bold line-through text-[#a7a7a4]">
          <FontAwesome name="rupee" size={12} /> {price}
        </Text>
        <Text className="font-extrabold text-lg">
          <FontAwesome name="rupee" size={12} /> {discountPrice}
        </Text>
      </View>
    </View>
  );
};

export default CartCard;
