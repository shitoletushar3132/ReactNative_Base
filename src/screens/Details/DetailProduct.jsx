import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  FlatList,
  Share,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import {Rating} from 'react-native-ratings';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Review from '../../components/home/Details/Review';
import {ImageUri} from '../../utils/constant';
import {
  getProductDetails,
  getReviews,
} from '../../requests/products/getProducts';
import Shimmer from 'react-native-shimmer-placeholder';
import AddReview from '../../components/home/Details/AddReview';
import {ActivityIndicator, Snackbar} from 'react-native-paper';
import {addToCart} from '../../requests/cart/addCart';
import {AppContext} from '../../contextProvider/AppContext';

const DetailProduct = () => {
  const [product, setProduct] = useState({});
  const [reviews, setReviews] = useState([]);
  const [currentVariant, setSelectedVariant] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // Track the currently selected image
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [cartLoading, setCartLoading] = useState(false);
  const route = useRoute();
  const {id} = route.params;
  const navigation = useNavigation();
  const [showAddReview, setShowAddReview] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackMessage, setSnackMessage] = useState(false);
  const [addedCart, setAddedCart] = useState(false);

  const {user} = useContext(AppContext);

  const fetchProductDetail = async () => {
    try {
      const data = await getProductDetails({id});
      setProduct(data.data.data);
      if (data.data.data.variant && data.data.data.variant.length > 0) {
        setSelectedVariant(data.data.data.variant[0]);
        setSelectedSize(data.data.data.variant[0].value);
      }
      if (data.data.data.images && data.data.data.images.length > 0) {
        setSelectedImage(data.data.data.images[0]);
      }
      setIsLoading(false); // Set loading to false when data is fetched
    } catch (error) {
      console.log(error);
      setIsLoading(false); // Ensure loading state is false even on error
    }
  };

  const fetchProductReviews = async () => {
    try {
      const data = await getReviews({id});
      setReviews(data.data.data.data);
      // setIsLoading(false); // Set loading to false when data is fetched
    } catch (error) {
      console.log(error);
      setIsLoading(false); // Ensure loading state is false even on error
    }
  };

  useEffect(() => {
    if (id == undefined) {
      navigation.goBack();
    } else {
      fetchProductDetail();
      fetchProductReviews();
    }
  }, [id]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAddedCart(false);
    }, 3000);
    return () => clearInterval(interval);
  }, [addedCart]);

  useEffect(() => {
    if (id == undefined) {
      navigation.goBack();
    } else {
      fetchProductReviews();
    }
  }, [id, snackMessage]);

  const {
    title = '',
    subTitle = '',
    description = '',
    avgRating = 0,
    catagory = '',
    totalReview = 0,
    totalSold = 0,
    images = [],
    variant = [],
  } = product;

  const truncatedDescription =
    description?.length > 150 ? description.slice(0, 130) + '...' : description;

  const handleQuantityChange = type => {
    if (type === 'increase') {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = async () => {
    try {
      if (user) {
        setCartLoading(true);
        const res = await addToCart({
          productId: id,
          productQuantity: `${currentVariant?.value} ${currentVariant?.unit}`,
          discount: currentVariant?.discount || 0,
          totalPrice: currentVariant.sellingPrice,
          productTitle: title,
          productImage: images[0],
          productVariant: currentVariant,
          productCatagory: catagory,
          navigation: navigation,
        });
        setAddedCart(true);
        console.log(res);
        setCartLoading(false);
      } else {
        navigation.navigate('Auth');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setCartLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center7">
        <ActivityIndicator size={'large'} color="#ff8000" />
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        contentContainerStyle={{flexGrow: 1, paddingBottom: 100}}
        keyboardShouldPersistTaps="handled">
        <View className="p-5">
          {/* Image and Header */}
          <View className="items-center mb-5">
            <View className="relative w-full">
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                className="absolute left-0 top-5 -translate-y-1/2">
                <FontAwesome5 name="arrow-left" size={24} color="#000" />
              </TouchableOpacity>

              <View className="flex items-center">
                <Shimmer
                  style={{width: 252, height: 250, borderRadius: 10}}
                  visible={!isLoading}>
                  {selectedImage && (
                    <Image
                      source={{uri: `${ImageUri}/${selectedImage}`}}
                      style={{width: 252, height: 250, resizeMode: 'contain'}}
                    />
                  )}
                </Shimmer>
              </View>

              <TouchableOpacity
                className="absolute right-0 top-5 -translate-y-1/2 flex-row gap-x-4"
                onPress={async () => {
                  try {
                    const result = await Share.share({
                      message: `Check out this product: https://nutribsc.com/product/${id}`,
                    });
                    if (result.action === Share.sharedAction) {
                      if (result.activityType) {
                        // shared with activity type of result.activityType
                      } else {
                        // shared
                      }
                    } else if (result.action === Share.dismissedAction) {
                      // dismissed
                    }
                  } catch (error) {
                    console.error('Error sharing:', error.message);
                  }
                }}>
                <Feather name="share-2" size={24} color="#000" />
              </TouchableOpacity>

              {images.length > 1 && (
                <View className="mt-4">
                  <FlatList
                    horizontal
                    data={images}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => (
                      <Shimmer
                        style={{width: 60, height: 60, borderRadius: 10}}
                        visible={!isLoading}>
                        <TouchableOpacity
                          onPress={() => setSelectedImage(item)}
                          className="">
                          <Image
                            source={{uri: `${ImageUri}/${item}`}}
                            style={{
                              width: 60,
                              height: 60,
                              resizeMode: 'contain',
                            }}
                            className={`mr-1 border ${
                              selectedImage === item
                                ? 'border-orange-500'
                                : 'border-gray-300'
                            } rounded-lg p-1`}
                          />
                        </TouchableOpacity>
                      </Shimmer>
                    )}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                      columnGap: 10,
                    }}
                  />
                </View>
              )}
            </View>

            {/* Thumbnail Images (Horizontal Scroll) */}

            <View className="justify-center items-center mt-4">
              <Text className="text-2xl font-bold text-center">{title}</Text>
              <Text className="text-sm text-gray-600 text-center mt-2">
                {subTitle}
              </Text>
            </View>
          </View>

          {/* Product Details */}
          <View className="mb-3">
            <Text className="font-bold text-lg mb-2">Product Details</Text>

            <Shimmer style={{width: '100%', height: 20}} visible={!isLoading}>
              <Text className="text-base text-gray-600">
                {showFullDescription ? description : truncatedDescription}
              </Text>
            </Shimmer>

            <Text className="text-[14px] text-gray-600 ">
              {showFullDescription ? description : truncatedDescription}
              {description.length > 130 && (
                <TouchableOpacity
                  onPress={() => setShowFullDescription(!showFullDescription)}
                  className="items-center">
                  <Text className="text-orange-500 font-semibold text-center">
                    {showFullDescription ? 'Read Less' : 'Read More'}
                  </Text>
                </TouchableOpacity>
              )}
            </Text>
          </View>

          {/* Rating and Price */}
          <View className="flex-row items-center mb-2">
            <Rating
              type="star"
              startingValue={avgRating}
              imageSize={19}
              readonly
            />
            <Text className="ml-2 text-gray-600">
              <Text className="font-bold">{avgRating}</Text> ({totalReview}
              reviews)
            </Text>
            <Text className="ml-2 text-gray-600">
              <Text className="font-bold">{totalSold}K+ </Text> Sold
            </Text>
          </View>

          <View className="flex-row items-center mb-2">
            <Text className="text-black font-bold text-2xl">
              <FontAwesome name="rupee" size={18} />{' '}
              {currentVariant?.sellingPrice}
            </Text>

            {currentVariant?.sellingPrice !== currentVariant?.mrp && (
              <Text className="text-gray-500 line-through ml-2">
                <FontAwesome name="rupee" size={14} /> {currentVariant?.mrp}
              </Text>
            )}

            <Text className="text-[#009908] ml-2">
              ({currentVariant?.discount}% off)
            </Text>
          </View>

          {/* Size and Quantity */}
          <View className="flex-row justify-between mb-5">
            <View>
              <Text className="text-black font-semibold mb-2">Size</Text>
              <View className="flex-row items-center">
                {variant.map((vari, index) => (
                  <TouchableOpacity
                    key={vari._id}
                    onPress={() => {
                      setSelectedSize(vari.value);
                      setSelectedVariant(vari);
                    }}
                    className={`${
                      selectedSize === vari.value
                        ? 'bg-[#DD5411]'
                        : 'bg-transparent'
                    } border border-[#DD5411] ${
                      index === 0 ? 'rounded-l-md' : ''
                    } ${
                      index === variant.length - 1 ? 'rounded-r-md' : ''
                    } px-4 py-2 items-center`}>
                    <Text
                      className={`${
                        selectedSize === vari.value
                          ? 'text-white'
                          : 'text-black'
                      } text-md`}>
                      {vari.value} {vari.unit}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
            <View>
              <Text className="text-black font-semibold mb-2">Quantity</Text>
              <View className="flex-row items-center border border-orange-500 rounded-lg px-4 py-1">
                <TouchableOpacity
                  onPress={() => handleQuantityChange('decrease')}>
                  <Text className="text-black text-2xl">－</Text>
                </TouchableOpacity>
                <Text className="mx-4 text-lg font-bold">{quantity}</Text>
                <TouchableOpacity
                  onPress={() => handleQuantityChange('increase')}>
                  <Text className="text-black text-2xl">＋</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Reviews */}
          <View className="mb-2">
            <TouchableOpacity
              className="mb-2  flex-row items-end justify-end"
              onPress={() =>
                user ? setShowAddReview(true) : navigation.navigate('Auth')
              }>
              <MaterialIcons
                name="add-circle-outline"
                size={20}
                color={'#ff8000'}
              />
              <Text className="flex justify-center ml-1 font-semibold">
                ADD A REVIEW
              </Text>
            </TouchableOpacity>
            <View className="shadow-lg">
              {reviews?.map((rate, index) => (
                <View key={index}>
                  <Review review={rate} />
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Buttons */}
      <View className="absolute bottom-0 w-full p-4 bg-white">
        <View className="flex-row justify-between">
          <TouchableOpacity
            className={`flex-1 ${
              addedCart ? 'bg-green-500' : ` bg-[#ff8000]`
            } py-1.5 rounded-xl mr-2 justify-center items-center`}
            onPress={() => handleAddToCart()}>
            {cartLoading ? (
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
          <TouchableOpacity
            className="flex-1 border border-orange-500 py-1.5 rounded-xl ml-2"
            onPress={() => {
              handleAddToCart();
              navigation.navigate('MainTabs', {screen: 'Cart'});
            }}>
            <Text className="text-orange-500 font-bold text-center text-lg">
              Buy Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {showAddReview && (
        <AddReview
          visible={showAddReview}
          onClose={setShowAddReview}
          id={id}
          setSnackbarVisible={setSnackbarVisible}
          setSnackMessage={setSnackMessage}
        />
      )}

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        action={{
          label: 'OK',
          onPress: () => setSnackbarVisible(false),
        }}
        style={{marginBottom: 10, backgroundColor: '#fff'}}>
        <Text className="text-gray-400">{snackMessage}</Text>
      </Snackbar>
    </SafeAreaView>
  );
};

export default DetailProduct;
