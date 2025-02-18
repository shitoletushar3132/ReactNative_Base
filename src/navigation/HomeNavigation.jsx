import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import TabBottomNavigation from './TabBottomNavigation';
import Search from '../components/home/Search';
import DetailProduct from '../screens/Details/DetailProduct';
import BillSummary from '../screens/BillSummary/BillSummary';
import Profile from '../screens/Profile/Profile';
import AddAddress from '../screens/Profile/AddAddress';
import OrderHistoy from '../screens/Profile/OrderHistoy';
import AuthNavigation from './AuthNavigation';
import {AppContext} from '../contextProvider/AppContext';
import {Alert} from 'react-native';
import EditProfile from '../screens/Profile/EditProfile';
import CategoryFilter from '../screens/Category/CategoryFilter';
import OrderDetail from '../screens/Profile/OrderDetail';

const Stack = createStackNavigator();

const HomeNavigation = () => {
  const {user} = useContext(AppContext);

  const requireAuth = component => {
    return user
      ? component
      : () => {
          // Alert.alert(
          //   'Authentication Required',
          //   'Please sign in to access this feature.',
          // );
          return <AuthNavigation />;
        };
  };

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="MainTabs">
      <Stack.Screen name="MainTabs" component={TabBottomNavigation} />
      <Stack.Screen name="Details" component={DetailProduct} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Bill" component={requireAuth(BillSummary)} />
      <Stack.Screen name="Profile" component={requireAuth(Profile)} />
      <Stack.Screen name="Address" component={requireAuth(AddAddress)} />
      <Stack.Screen
        name="OrderHistory"
        component={requireAuth(OrderHistoy)}
        options={{headerShown: true, headerTitle: 'Order History'}}
      />
      <Stack.Screen
        name="OrderDetail"
        component={requireAuth(OrderDetail)}
        options={{headerShown: true, headerTitle: 'Detail Order'}}
      />
      <Stack.Screen
        name="EditProfile"
        component={requireAuth(EditProfile)}
        options={{headerShown: true, headerTitle: 'Edit Profile'}}
      />
      <Stack.Screen
        name="CategoryFilter"
        component={CategoryFilter}
        options={{
          headerShown: true,
          headerTitle: 'Category',
        }}
      />
      <Stack.Screen name="Auth" component={AuthNavigation} />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
