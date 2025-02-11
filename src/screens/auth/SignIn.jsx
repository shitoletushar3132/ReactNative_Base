import {View, Text, Button} from 'react-native';
import React from 'react';

const SignIn = ({navigation}) => {
  return (
    <View>
      <Text>SignIn</Text>
      <Button title="signUp" onPress={() => navigation.navigate('SignUp')} />
    </View>
  );
};

export default SignIn;
