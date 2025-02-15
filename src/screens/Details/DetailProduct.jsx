import {
  View,
  Text,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Products from '../../utils/data/home.json';
import Feather from 'react-native-vector-icons/Feather';
import {Rating} from 'react-native-ratings';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import RatingData from '../../utils/data/Rating.json';
import Review from '../../components/home/Details/Review';

const DetailProduct = () => {
  const [selectedSize, setSelectedSize] = useState(250);
  const [quantity, setQuantity] = useState(1);
  const route = useRoute();
  const {id} = route.params;
  const navigation = useNavigation();

  const handleQuantityChange = type => {
    if (type === 'increase') {
      setQuantity(prev => prev + 1);
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  useEffect(() => {
    if (id == undefined) {
      navigation.goBack();
    }
  }, [id]);

  const {name, discount, color, price, discountPrice, imageUri} = Products.find(
    product => product.id === id,
  );

  const description =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio ipsam quo eveniet quam iste ipsum pariatur id recusandae voluptatibus! Tempore dignissimos aliquam natus error quod quo esse, deleniti aliquid quibusdam.faslkfjklasdjfldskj ajflakjflsdkjfladsfj ljslf jsdlfj dsklfjdsklfjsdlkfjdsklfmadsklfjds ldsfklmdsjfldsjfdsljfldskjfkldsfisljflkdsjfidsljfnflkdsfjdsiojfms,jdsiojfdskl';

  const [showFullDescription, setShowFullDescription] = useState(false);
  const truncatedDescription =
    description.length > 150 ? description.slice(0, 130) + '...' : description;

  const {rating, reviews, sold} = {rating: 4.5, reviews: 999, sold: 12};
  const sizes = [150, 250];

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
                <Image
                  source={require('../../assets/Home/Products/box.png')}
                  style={{width: 252, height: 250}}
                />
              </View>

              <View className="absolute right-0 top-5 -translate-y-1/2 flex-row gap-x-4">
                <Feather name="share-2" size={24} color="#000" />
              </View>
            </View>

            <View className="justify-center items-center mt-4">
              <Text className="text-2xl font-bold text-center">{name}</Text>
              <Text className="text-sm text-gray-600 text-center mt-2">
                {description.slice(0, 100)}...
              </Text>
            </View>
          </View>

          {/* Product Details */}
          <View className="mb-3">
            <Text className="font-bold text-lg mb-2">Product Details</Text>
            <Text className="text-base text-gray-600">
              {showFullDescription ? description : truncatedDescription}
              {description.length > 150 && (
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
          <View className="flex-row items-center mb-3">
            <Rating
              type="star"
              startingValue={rating}
              imageSize={19}
              readonly
            />
            <Text className="ml-2 text-gray-600">
              <Text className="font-bold">{rating}</Text> ({reviews} reviews)
            </Text>
            <Text className="ml-2 text-gray-600">
              <Text className="font-bold">{sold}K+ </Text> Sold
            </Text>
          </View>

          <View className="flex-row items-center mb-3">
            <Text className="text-black font-bold text-2xl">
              <FontAwesome name="rupee" size={18} /> {price}
            </Text>
            <Text className="text-gray-400 line-through text-lg ml-2">
              <FontAwesome name="rupee" size={14} /> {discountPrice}
            </Text>
            <Text className="text-[#009908] ml-2">({discount}% off)</Text>
          </View>

          {/* Size and Quantity */}
          <View className="flex-row justify-between mb-5">
            <View>
              <Text className="text-black font-semibold mb-2">Size</Text>
              <View className="flex-row items-center">
                {sizes.map((size, index) => (
                  <TouchableOpacity
                    key={size}
                    onPress={() => setSelectedSize(size)}
                    className={`${
                      selectedSize === size ? 'bg-[#DD5411]' : 'bg-transparent'
                    } border border-[#DD5411] ${index == 0 && 'rounded-l-md'} ${
                      sizes.length - 1 === index && 'rounded-r-md'
                    } px-4 py-2 items-center`}>
                    <Text
                      className={`${
                        selectedSize === size ? 'text-white' : 'text-black'
                      } text-md`}>
                      {size} gm
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
            {RatingData.map(rate => (
              <View key={rate.id}>
                <Review review={rate} />
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Sticky Bottom Buttons */}
      <View className="absolute bottom-0 w-full p-4 bg-white">
        <View className="flex-row justify-between">
          <TouchableOpacity className="flex-1 bg-orange-500 py-1.5 rounded-xl mr-2">
            <Text className="text-white font-bold text-center text-lg">
              Add To Cart
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-1 border border-orange-500 py-1.5 rounded-xl ml-2">
            <Text className="text-orange-500 font-bold text-center text-lg">
              Buy Now
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DetailProduct;
