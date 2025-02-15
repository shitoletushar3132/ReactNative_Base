import {View, Text} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import React from 'react';

const StarRating = ({rating, maxStars = 5}) => {
  return (
    <View className="flex-row items-center">
      {[...Array(maxStars)].map((_, index) => {
        return (
          <FontAwesome
            key={index}
            name={index < rating ? 'star' : 'star-o'}
            size={16}
            color={index < rating ? '#FFD700' : '#C0C0C0'}
            style={{marginRight: 2}}
          />
        );
      })}
      <Text className="ml-1 text-sm text-gray-500">{rating.toFixed(1)}</Text>
    </View>
  );
};

export default StarRating;
