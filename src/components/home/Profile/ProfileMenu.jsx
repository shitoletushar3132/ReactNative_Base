import {View, Text, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {removeUser} from '../../../Storage/removeLocalData';
import {AppContext} from '../../../contextProvider/AppContext';

const MenuItem = ({iconComponent, text, isHighlighted, route, onPress}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    console.log('press');
    if (onPress) {
      onPress(); // Execute logout function if provided
    } else if (route) {
      navigation.navigate(route);
    }
  };

  return (
    <TouchableOpacity
      style={{flexDirection: 'row', alignItems: 'center', gap: 12}}
      onPress={handlePress}>
      {React.cloneElement(iconComponent, {
        color: isHighlighted ? '#DD5411' : '#000',
      })}
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: isHighlighted ? '#DD5411' : '#000',
        }}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const ProfileMenu = () => {
  const {setUser} = useContext(AppContext);
  const navigation = useNavigation();

  const handleLogout = async () => {
    await removeUser('accessToken'); // Remove token
    setUser(null); // Clear user context

    navigation.navigate('MainTabs'); // Navigate to Login screen after logout
  };

  return (
    <View style={{marginHorizontal: 40, marginTop: 20, gap: 16}}>
      <MenuItem
        iconComponent={<FontAwesome name="user-circle" size={16} />}
        text="My Profile"
        route="EditProfile"
        isHighlighted={true}
      />
      <MenuItem
        iconComponent={<FontAwesome name="edit" size={16} />}
        text="Address Details"
        route="Address"
      />
      <MenuItem
        iconComponent={<MaterialIcons name="payments" size={16} />}
        text="Payments"
      />
      <MenuItem
        iconComponent={
          <MaterialCommunityIcons name="brightness-percent" size={16} />
        }
        text="Coupons"
      />
      <MenuItem
        iconComponent={<FontAwesome name="shopping-cart" size={16} />}
        text="My Order"
        route="OrderHistory"
      />

      <MenuItem
        iconComponent={<FontAwesome name="play-circle-o" size={16} />}
        text="Subscription"
      />
      <MenuItem
        iconComponent={<FontAwesome name="gift" size={16} />}
        text="Rewards and Points"
      />
      <MenuItem
        iconComponent={<MaterialCommunityIcons name="logout" size={16} />}
        text="Log Out"
        onPress={handleLogout}
        isHighlighted={true}
      />
    </View>
  );
};

export default ProfileMenu;
