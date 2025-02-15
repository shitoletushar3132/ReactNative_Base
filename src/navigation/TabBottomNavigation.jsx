import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Home from '../screens/home/Home';
import Contact from '../screens/home/Contact';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MainLayout from '../components/home/Header/MainHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Cart from '../screens/Cart/Cart';
import Shop from '../screens/Shop/Shop';
import Category from '../screens/Category/Category';

const Tab = createBottomTabNavigator();

const TabBottomNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        // tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: 'white',
          elevation: 5,
          borderRadius: 10,
          height: 50,
          // paddingVertical: 60,
        },
        tabBarInactiveTintColor: 'gray',
        tabBarActiveTintColor: '#DD5411',
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color, size}) => (
            <SimpleLineIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Category"
        component={Category}
        options={{
          headerShown: true,
          // headerTitleAlign: 'center', // Centers the title properly
          headerStyle: {backgroundColor: 'white', height: 60}, // Only valid styles
          tabBarIcon: ({color, size}) => (
            <Ionicons name="grid-outline" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          headerShown: true,
          headerStyle: {},
          tabBarIcon: ({color, size}) => (
            <AntDesign name="shoppingcart" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Shop"
        component={Shop}
        options={{
          headerShown: true,
          tabBarIcon: ({color, size}) => (
            <FontAwesome6 name="shop" color={color} size={18} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabBottomNavigation;
