import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Quantity from './Quantity';
import truncateText from '../../../utils/helper/truncateText';
import {ImageUri} from '../../../utils/constant';
import {useNavigation} from '@react-navigation/native';
import {
  deleteCartProduct,
  editProductQuantity,
} from '../../../requests/cart/addCart';
import {AppContext} from '../../../contextProvider/AppContext';

const CartCard = ({product, index}) => {
  const navigation = useNavigation();
  const {
    _id,
    productTitle,
    productQuantity,
    quantity,
    productImage,
    productVariant,
    productId,
  } = product;
  const {setCartRefreshData} = useContext(AppContext);
  const [currQuantity, setCurrQuantity] = useState(quantity);

  const handleQuantityChange = type => {
    setCurrQuantity(prev =>
      type === 'increase' ? prev + 1 : Math.max(prev - 1, 0),
    );
  };

  useEffect(() => {
    if (currQuantity === 0) {
      handleDelete();
    } else {
      const timeout = setTimeout(() => {
        handleEditQuantity();
      }, 500); // Debounce API call
      return () => clearTimeout(timeout);
    }
  }, [currQuantity]);

  const handleDelete = async () => {
    try {
      await deleteCartProduct({itemId: _id, navigation});
      setCartRefreshData(prev => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditQuantity = async () => {
    try {
      await editProductQuantity({itemId: _id, value: currQuantity});
      setCartRefreshData(prev => !prev);
    } catch (error) {
      console.log(error);
    }
  };

  const truncatedName = truncateText(productTitle, 10);

  return (
    <TouchableOpacity
      className={`flex-row items-center py-1 ${
        index === 0 ? 'border-0' : 'border-t'
      } border-gray-300 border-dashed`}
      onPress={() => navigation.navigate('Details', {id: productId})}>
      <View className="flex-row items-center">
        <Image
          source={{uri: `${ImageUri}/${productImage}`}}
          className="w-16 h-20"
          resizeMode="cover"
          style={{borderRadius: 10}}
        />
        <View className="ml-2">
          <Text className="font-semibold mb-1">{truncatedName}</Text>
          <Text className="text-[#a7a7a4] text-md">
            {productQuantity} X {currQuantity}
          </Text>
        </View>
      </View>

      <View className="mx-4">
        <Quantity
          handleQuantityChange={handleQuantityChange}
          quantity={currQuantity}
        />
      </View>

      <View>
        <Text className="font-bold text-[#000]">
          <FontAwesome name="rupee" size={12} />
          {productVariant.mrp * currQuantity}
        </Text>
        {productVariant.sellingPrice !== productVariant.mrp && (
          <Text className="font-extrabold text-lg line-through">
            <FontAwesome name="rupee" size={12} /> {productVariant.sellingPrice}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CartCard;
