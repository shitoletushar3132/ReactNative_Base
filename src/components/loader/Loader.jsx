import {View, Text} from 'react-native';
import React from 'react';
import {ActivityIndicator} from 'react-native-paper';

const Loader = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator animating={true} size="medium" color={'#DD5411'} />
    </View>
  );
};

export default Loader;
