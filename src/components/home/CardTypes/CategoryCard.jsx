import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {ImageUri} from '../../../utils/constant';
import {useNavigation} from '@react-navigation/native';

const CategoryCard = ({category}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('CategoryFilter', {category: category?.name})
      }
      className="flex-row mx-1 rounded-lg my-1"
      style={{flex: 1, height: 100}}>
      {/* Increased height */}
      <View className="w-24 bg-white rounded-lg shadow-md  items-center">
        <Image
          source={{
            uri: `${ImageUri}/${category?.image}`,
          }}
          className="w-full h-20 rounded-lg" // Adjusted height
          resizeMode="contain"
        />
        <Text className="text-center text-xs font-medium text-black">
          {category?.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryCard;
