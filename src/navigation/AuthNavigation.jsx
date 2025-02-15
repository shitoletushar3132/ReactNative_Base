import React, {useContext} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import SignIn from '../screens/auth/SignIn';
import SignUp from '../screens/auth/SignUp';
import ForgotPassword from '../screens/auth/ForgotPassword';
import TabBottomNavigation from './TabBottomNavigation';
import HomeNavigation from './HomeNavigation';
import {AppContext} from '../contextProvider/AppContext';

const Stack = createStackNavigator();

const AuthNavigation = () => {
  const {user} = useContext(AppContext);
  return (
    <Stack.Navigator initialRouteName="SignIn">
      {!user && (
        <>
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{headerShown: false}}
          />
        </>
      )}

      <Stack.Screen
        name="MainTabs"
        component={HomeNavigation}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigation;
