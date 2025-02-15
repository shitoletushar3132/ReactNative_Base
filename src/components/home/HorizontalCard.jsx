import {Image, Dimensions, View} from 'react-native';
import React from 'react';
import {ImageUri} from '../../utils/constant';

const {width, height} = Dimensions.get('window'); // Get screen dimensions

const HorizontalCard = ({product}) => {
  console.log(width);
  return (
    <Image
      source={{uri: `${ImageUri}/${product.image}`}}
      style={{
        width: width, // Full screen width
        height: width * 0.4, // Adjust height to ensure proper visibility
      }}
      resizeMode="stretch" // Ensures the full image is visible without cutting off
    />
  );
};

export default HorizontalCard;
