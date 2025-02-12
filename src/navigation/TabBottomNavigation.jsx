import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Home from '../screens/home/Home';
import Contact from '../screens/home/Contact';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MainLayout from '../components/home/Header/MainHeader';

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
        tabBarActiveTintColor: '#FF8000',
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
        component={Contact}
        options={{
          tabBarIcon: ({color, size}) => (
            <SimpleLineIcons name="phone" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Cart"
        component={Contact}
        options={{
          tabBarIcon: ({color, size}) => (
            <AntDesign name="shoppingcart" color={color} size={size} />
          ),
        }}
      />

      <Tab.Screen
        name="Favourite"
        component={Contact}
        options={{
          tabBarIcon: ({color, size}) => (
            <AntDesign name="hearto" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabBottomNavigation;
