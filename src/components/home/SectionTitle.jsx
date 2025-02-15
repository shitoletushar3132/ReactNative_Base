import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SectionTitle = ({title, onPressSeeAll}) => {
  return (
    <TouchableOpacity className="flex-row justify-between">
      <Text className="font-bold text-[18px]">{title}</Text>
      <TouchableOpacity
        className="flex-row justify-between items-center"
        onPress={onPressSeeAll}>
        <Text className="mr-3 text-[#DD5411] underline font-semibold">
          VIEW ALL
        </Text>
        <FontAwesome name="chevron-right" color={'#DD5411'} size={12} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default SectionTitle;
