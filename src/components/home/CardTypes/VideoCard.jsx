import {View, Text, TouchableOpacity, Image} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {ImageUri} from '../../../utils/constant';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import YoutubePlayer from 'react-native-youtube-iframe';

const VideoCard = ({video}) => {
  console.log(video);
  const {product, url, fullName, about} = video;
  const {title, subTitle, images, variant, catagory} = product;

  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
    }
  }, []);

  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className="p-4 mt-5 rounded-3xl bg-white shadow-lg border border-gray-200 items-center w-[85%]"
      onPress={() => navigation.navigate('Details', {id})}>
      <View>
        <YoutubePlayer
          height={160}
          play={playing}
          videoId={url} // This is your YouTube video ID
          onChangeState={onStateChange}
        />
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
      <TouchableOpacity className="w-full bg-[#DD5411] py-2 rounded-2xl mt-3">
        <Text className="text-white font-bold text-center">Add To Cart</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default VideoCard;
