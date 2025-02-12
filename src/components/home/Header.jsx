import {Text, View, Image} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Octicons from 'react-native-vector-icons/Octicons';
import Fontisto from 'react-native-vector-icons/Fontisto';

const Header = () => {
  return (
    <SafeAreaView className="bg-transparent">
      <View className="flex-row justify-between items-center pt-4">
        <Octicons name="three-bars" size={24} color={'#fff'} />

        <View className="flex-row gap-x-4 items-center">
          <View>
            <Fontisto name="bell" size={28} color={'#fff'} />
          </View>
          <Image
            source={require('../../assets/Home/profile.png')}
            className="w-10 h-10 rounded-full"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Header;
