import React from 'react';
import {ScrollView, View} from 'react-native';

const HorizontalScrollView = ({children}) => {
  return (
    <ScrollView
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      className="flex-row rounded-md">
      {children}
    </ScrollView>
  );
};

export default HorizontalScrollView;
