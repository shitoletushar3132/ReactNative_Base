import {View, Text, TouchableOpacity, Linking} from 'react-native';
import React, {useContext} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useNavigation} from '@react-navigation/native';
import {removeUser} from '../../../Storage/removeLocalData';
import {AppContext} from '../../../contextProvider/AppContext';

const MenuItem = ({
  iconComponent,
  text,
  isHighlighted,
  route,
  link,
  onPress,
}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    console.log('press');
    if (onPress) {
      onPress(); // Execute logout function if provided
    } else if (route) {
      navigation.navigate(route);
    } else if (link) {
      Linking.openURL(link);
    }
  };

  return (
    <TouchableOpacity
      style={{flexDirection: 'row', alignItems: 'center', gap: 12}}
      onPress={handlePress}>
      {React.cloneElement(iconComponent, {
        color: isHighlighted ? '#DD5411' : '#4f4f4f',
      })}
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: isHighlighted ? '#DD5411' : '#4f4f4f',
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
    <View style={{marginHorizontal: 40, gap: 16}}>
      <MenuItem
        iconComponent={<FontAwesome name="user-circle" size={20} />}
        text="My Profile"
        route="EditProfile"
        isHighlighted={true}
      />
      <MenuItem
        iconComponent={<FontAwesome name="edit" size={20} />}
        text="Address Details"
        route="Address"
      />

      <MenuItem
        iconComponent={
          <MaterialCommunityIcons name="brightness-percent" size={20} />
        }
        text="Coupons"
      />
      <MenuItem
        iconComponent={<FontAwesome name="shopping-cart" size={20} />}
        text="My Order"
        route="OrderHistory"
      />

      <MenuItem
        iconComponent={<FontAwesome name="file-text-o" size={20} />}
        text="Terms & Condition"
        link="https://nutribsc.com/terms-and-conditions"
      />
      <MenuItem
        iconComponent={<FontAwesome name="shield" size={20} />}
        text="Privacy Policy"
        link="https://nutribsc.com/privacy-and-policy"
      />
      <MenuItem
        iconComponent={<FontAwesome name="money" size={20} />}
        text="Refund & Returns"
        link="https://nutribsc.com/refund-and-returns"
      />
      <MenuItem
        iconComponent={<FontAwesome name="truck" size={20} />}
        text="Shipping & Delivery"
        link="https://nutribsc.com/shipping-and-delivery"
      />

      <MenuItem
        iconComponent={<MaterialCommunityIcons name="logout" size={20} />}
        text="Log Out"
        onPress={handleLogout}
        isHighlighted={true}
      />
    </View>
  );
};

export default ProfileMenu;
