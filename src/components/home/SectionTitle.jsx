import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SectionTitle = ({title, onPressSeeAll}) => {
  return (
    <TouchableOpacity className="flex-row justify-between">
      <Text className="font-bold text-[15px]">{title}</Text>
      <TouchableOpacity
        className="flex-row justify-between items-center"
        onPress={onPressSeeAll}>
        <Text className="mr-3 text-[#F67C3B] underline font-semibold">
          See all
        </Text>
        <FontAwesome name="chevron-right" color={'#F67C3B'} size={12} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default SectionTitle;
