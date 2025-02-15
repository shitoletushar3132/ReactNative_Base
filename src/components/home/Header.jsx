import {Text, View, Image, TouchableOpacity} from 'react-native';
import React, {useContext, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import Octicons from 'react-native-vector-icons/Octicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useNavigation} from '@react-navigation/native';
import {AppContext} from '../../contextProvider/AppContext';
import {Avatar} from 'react-native-paper';
import {ImageUri} from '../../utils/constant';

const Header = () => {
  const {user} = useContext(AppContext);
  const navigation = useNavigation();
  return (
    <SafeAreaView className="bg-transparent">
      <View className="flex-row justify-between items-center ">
        {user ? (
          <TouchableOpacity
            onPress={async () => navigation.navigate('Profile')}>
            <Octicons name="three-bars" size={24} color={'#fff'} />
          </TouchableOpacity>
        ) : (
          <View></View>
        )}

        <View className="flex-row gap-x-4 items-center">
          <View>
            <Fontisto name="bell" size={28} color={'#fff'} />
          </View>

          {user ? (
            <>
              {user.image ? (
                <Avatar.Image
                  size={32}
                  source={{
                    uri: `${ImageUri}/${user.image}`,
                  }}
                />
              ) : (
                <Avatar.Icon size={32} icon="camera" />
              )}
            </>
          ) : (
            <TouchableOpacity
              onPress={() => navigation.navigate('Auth')}
              className="">
              <Text className="text-white font-bold text-lg">Login</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Header;
