import {View, Text, TouchableOpacity, Image, Linking} from 'react-native';
import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ImageUri} from '../../../utils/constant';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import YoutubePlayer from 'react-native-youtube-iframe';
import {AppContext} from '../../../contextProvider/AppContext';
import {addToCart} from '../../../requests/cart/addCart';
import {ActivityIndicator} from 'react-native-paper';

const VideoCard = ({video}) => {
  const {product, url, fullName, about, productId} = video;
  const [addedCart, setAddedCart] = useState(false);
  const navigation = useNavigation();
  const {setCartRefreshData, user} = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const {title, subTitle, quantity, images, variant, catagory} = product;
  const {value, unit, sellingPrice, mrp, discount} = variant[0];

  console.log(video);

  const handleAddToCart = async () => {
    try {
      if (user) {
        setLoading(true);
        const res = await addToCart({
          productId: productId,
          productQuantity: `$${value} ${unit}`,
          totalPrice: sellingPrice,
          productTitle: title,
          productImage: images[0],
          productVariant: variant[0],
          productCatagory: catagory,
          navigation: navigation,
        });
        setCartRefreshData(prev => !prev);
        setLoading(false);
        setAddedCart(true);
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
      className="p-4 mt-5 rounded-3xl bg-white shadow-lg border border-gray-200 items-center w-[85%]"
      onPress={() => navigation.navigate('Details', {id: productId})}>
      <View>
        {/* <YoutubePlayer
          height={160}
          play={playing}
          videoId={url} // Ensure url is only the video ID
          onChangeState={onStateChange}
          onReady={() => console.log('Player is ready')}
          webViewStyle={{opacity: 0.99}} // Fixes some rendering issues on Android
        /> */}

        <TouchableOpacity
          style={{height: 160}}
          className="items-center justify-center"
          onPress={() =>
            Linking.openURL(`https://www.youtube.com/watch?v=${url}`)
          }>
          <FontAwesome name="youtube-play" size={50} color="#FF0000" />
        </TouchableOpacity>
      </View>
      {/* Product Name & Description */}
      <Text
        className="text-black  font-bold mt-1 w-full "
        numberOfLines={1}
        ellipsizeMode="tail"
        style={{flexWrap: 'wrap'}}>
        {fullName}
      </Text>
      <Text
        className="text-gray-500  font-bold mt-1 w-full "
        numberOfLines={1}
        ellipsizeMode="tail"
        style={{flexWrap: 'wrap'}}>
        {about}
      </Text>
      {/* Product Image */}
      <View className="flex-row w-full rounded-2xl items-center p-2">
        <Image
          source={{
            uri: product?.images?.[0]
              ? `${ImageUri}/${product.images[0]}`
              : 'https://via.placeholder.com/150',
          }}
          style={{height: 80, width: 80, borderRadius: 12}}
          resizeMode="cover"
        />

        <View className="flex gap-y-2 ml-3">
          <Text className="text-gray-500">{catagory}</Text>
          <Text className="font-bold">{title}</Text>

          {variant?.[0] && (
            <Text className="text-black font-semibold ">
              <FontAwesome name="rupee" size={14} /> {variant[0].sellingPrice}
            </Text>
          )}
        </View>
      </View>
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

export default VideoCard;
