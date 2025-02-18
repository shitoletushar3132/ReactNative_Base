import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';
import {ImageUri} from '../../utils/constant';
import {addToCart} from '../../requests/cart/addCart';
import {AppContext} from '../../contextProvider/AppContext';
import {ActivityIndicator} from 'react-native-paper';
import AntDesign from 'react-native-vector-icons/AntDesign';

const VerticalCard = ({product}) => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const {user, setCartRefreshData} = useContext(AppContext);
  const [addedCart, setAddedCart] = useState(false);
  const {_id, title, subTitle, quantity, images, variant, catagory} = product;
  const {value, unit, sellingPrice, mrp, discount} = variant[0];

  const handleAddToCart = async () => {
    try {
      if (user) {
        setLoading(true);
        const res = await addToCart({
          productId: _id,
          productQuantity: `${value} ${unit}`,
          totalPrice: sellingPrice,
          productTitle: title,
          productImage: images[0],
          productVariant: variant[0],
          productCatagory: catagory,
          navigation: navigation,
        });
        setAddedCart(true);
        setLoading(false);
        setCartRefreshData(prev => !prev);
      } else {
        navigation.navigate('Auth');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    // Set interval
    const interval = setInterval(() => {
      setAddedCart(false);
    }, 3000);

    return () => clearInterval(interval);
  }, [addedCart]);

  return (
    <TouchableOpacity
      className="p-4 mb-5 rounded-3xl bg-white shadow-lg border border-gray-200 items-center w-[48%] "
      onPress={() => navigation.navigate('Details', {id: _id})}>
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
      <TouchableOpacity
        className={`w-full ${
          addedCart ? 'bg-green-500' : ` bg-[#ff8000]`
        } py-2 rounded-2xl mt-3`}
        onPress={() => handleAddToCart()}>
        {loading ? (
          <ActivityIndicator color="#fff" size={'small'} />
        ) : addedCart ? (
          <View className="flex-row justify-center items-center ">
            {/* <AntDesign name="checkcircle" color={'white'} /> */}
            <Text className="text-white font-bold text-center text-sm">
              ADDED TO CART
            </Text>
          </View>
        ) : (
          <Text className="text-white font-bold text-center text-sm">
            ADD TO CART
          </Text>
        )}
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default VerticalCard;
