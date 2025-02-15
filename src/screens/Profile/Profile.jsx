import {
  View,
  Text,
  Image,
  Dimensions,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useEffect} from 'react';
import ProfileMenu from '../../components/home/Profile/ProfileMenu';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import {AppContext} from '../../contextProvider/AppContext';
import {Avatar} from 'react-native-paper';
import {ImageUri} from '../../utils/constant';

const Profile = () => {
  const screenWidth = Dimensions.get('window').width;
  const navigation = useNavigation();
  const {user} = useContext(AppContext);

  if (!user) {
    return navigation.navigate('SignIn');
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        {/* Header Section */}
        <View className="relative">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{position: 'absolute', top: 10, left: 10, zIndex: 10}}>
            <Ionicons name="arrow-back" size={24} color={'#000'} />
          </TouchableOpacity>

          <Image
            source={require('../../assets/Home/headerBack.png')}
            className="h-[150px]"
            resizeMode="cover"
            style={{width: screenWidth}}
          />
          {/* Profile Image */}
          <View
            className="absolute top-24"
            style={{
              left: screenWidth / 2 - 67.5, // Center the image horizontally
            }}>
            {user.image ? (
              <Avatar.Image
                size={100}
                source={{
                  uri: `${ImageUri}/${user.image}`,
                }}
              />
            ) : (
              <Avatar.Icon size={100} icon="camera" />
            )}
          </View>
        </View>

        {/* Profile Menu Section */}
        <View className="mt-24">
          {/* Add margin to avoid overlap with profile image */}
          <ProfileMenu />
        </View>
      </ScrollView>

      {/* Bottom Image Section */}
      <View className="absolute bottom-0">
        <Image
          source={require('../../assets/profile/Bottom.png')}
          className="h-[200px]"
          resizeMode="cover"
          style={{width: screenWidth}} // Ensure the image spans the full width
        />
      </View>
    </SafeAreaView>
  );
};

export default Profile;
