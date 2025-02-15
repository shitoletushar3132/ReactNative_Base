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
      style={{flex: 1, height: 140}}>
      {/* Increased height */}
      <View className="w-28 bg-white rounded-lg shadow-lg p-2 items-center">
        <Image
          source={{
            uri: `${ImageUri}/${category?.image}`,
          }}
          className="w-full h-24 rounded-lg" // Adjusted height
          resizeMode="contain"
        />
        <Text className="mt-2 text-center font-medium text-black">
          {category?.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryCard;
