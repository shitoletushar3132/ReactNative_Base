import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TabBottomNavigation from './TabBottomNavigation';
import Search from '../components/home/Search';
import DetailProduct from '../screens/Details/DetailProduct';

const Stack = createStackNavigator();

const HomeNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="MainTabs">
      <Stack.Screen name="MainTabs" component={TabBottomNavigation} />
      <Stack.Screen name="Details" component={DetailProduct} />
      <Stack.Screen name="Search" component={Search} />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
