import React, {useContext, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Home from '../screens/home/Home';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Cart from '../screens/Cart/Cart';
import Shop from '../screens/Shop/Shop';
import Category from '../screens/Category/Category';
import {getAllCart} from '../requests/cart/addCart';
import {Text, View} from 'react-native';
import {AppContext} from '../contextProvider/AppContext';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Blog from '../screens/blog/Blog';

const Tab = createBottomTabNavigator();

const TabBottomNavigation = () => {
  const {
    user,
    setCartItems,
    cartRefreshData,
    cartTotalItems,
    setCartTotalItems,
  } = useContext(AppContext);
  const fetchCartNumber = async () => {
    try {
      if (user) {
        const res = await getAllCart();
        setCartItems(res.data.data);
        setCartTotalItems(res.data.data.length);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchCartNumber();
  }, [cartRefreshData, user]);
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
        name="Blog"
        component={Blog}
        options={{
          headerShown: true,
          tabBarIcon: ({color, size}) => (
            <MaterialIcons name="article" color={color} size={size} />
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
        name="Shop"
        component={Shop}
        options={{
          headerShown: true,
          tabBarIcon: ({color, size}) => (
            <FontAwesome6 name="shop" color={color} size={18} />
          ),
        }}
      />

      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          headerShown: true,
          tabBarIcon: ({color, size}) => (
            <View>
              <AntDesign name="shoppingcart" color={color} size={size} />
              {cartTotalItems > 0 && (
                <View
                  style={{
                    position: 'absolute',
                    right: -6,
                    top: -3,
                    backgroundColor: 'red',
                    borderRadius: 10,
                    width: 16,
                    height: 16,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 10,
                      fontWeight: 'bold',
                    }}>
                    {cartTotalItems}
                  </Text>
                </View>
              )}
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabBottomNavigation;
