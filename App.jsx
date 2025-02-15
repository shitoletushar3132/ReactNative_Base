import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AuthNavigation from './src/navigation/AuthNavigation';
import {AppProvider} from './src/contextProvider/AppContext';
import HomeNavigation from './src/navigation/HomeNavigation';
import {navigationRef} from './src/navigation/NavigationService';

const Stack = createStackNavigator();

const App = () => {
  return (
    <AppProvider>
      <NavigationContainer ref={navigationRef}>
        {/* <AuthNavigation /> */}
        <HomeNavigation />
      </NavigationContainer>
    </AppProvider>
  );
};

export default App;
