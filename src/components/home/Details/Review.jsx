import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Rating} from 'react-native-ratings';
import {Avatar} from 'react-native-paper';

const Review = ({review}) => {
  const [showFullDescription, setShowFullDescription] = useState(false);

  const truncatedDescription =
    review.comment > 150
      ? review.comment.slice(0, 130) + '...'
      : review.comment;

  return (
    <View className="py-3 px-2 bg-white rounded-lg  border-b border-slate-200 mt-2">
      <View className="flex-row items-center">
        <Avatar.Text
          size={24}
          label={review.username.slice(0, 2)}
          style={{width: 48, height: 48, borderRadius: '50%'}}
        />
        <View className="ml-4 ">
          <View className="flex-row items-center">
            <Text className="text-lg font-bold mr-3">{review.username}</Text>

            <Rating
              type="star"
              startingValue={review.rating}
              imageSize={15}
              readonly
            />
          </View>
          <View className="mt-2">
            <Text className="text-base text-gray-600">
              {showFullDescription ? review.comment : truncatedDescription}
            </Text>
            {review.comment > 150 && (
              <TouchableOpacity
                onPress={() => setShowFullDescription(!showFullDescription)}>
                <Text className="text-orange-500 font-semibold text-center">
                  {showFullDescription ? 'Read Less' : 'Read More'}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </View>
  );
};

export default Review;
