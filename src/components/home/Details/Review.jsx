import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Rating} from 'react-native-ratings';

const Review = ({review}) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const truncatedDescription =
    review.review.length > 150
      ? review.review.slice(0, 130) + '...'
      : review.review;

  return (
    <View className="p-4 bg-white rounded-lg shadow-md mb-4">
      <View className="flex-row items-center">
        <Image
          source={{uri: review.avatar}}
          className="w-12 h-12 rounded-full"
        />
        <View className="ml-4 flex-row items-center">
          <Text className="text-lg font-bold">{review.name}</Text>
          <Rating
            type="star"
            startingValue={review.rating}
            imageSize={15}
            readonly
          />
        </View>
      </View>
      <View className="mt-2">
        <Text className="text-base text-gray-600">
          {showFullDescription ? review.review : truncatedDescription}
        </Text>
        {review.review.length > 150 && (
          <TouchableOpacity
            onPress={() => setShowFullDescription(!showFullDescription)}>
            <Text className="text-orange-500 font-semibold text-center">
              {showFullDescription ? 'Read Less' : 'Read More'}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Review;
