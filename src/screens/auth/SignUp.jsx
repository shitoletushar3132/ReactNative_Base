import {
  View,
  Text,
  SafeAreaView,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  ScrollView,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import AuthInput from '../../components/auth/AuthInput';
import AuthButton from '../../components/auth/AuthButton';
import validateSignUpForm from '../../utils/Validation/auth/signUp';
import NavigateButton from '../../components/NavigateButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';

const SignUp = ({navigation}) => {
  const screenWidth = Dimensions.get('window').width;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData({...formData, [field]: value});
  };

  const handleSignUp = () => {
    if (validateSignUpForm(formData)) {
      setLoading(true);
      setTimeout(() => {
        console.log('Form Data:', formData);
        setLoading(false);
      }, 3000);
    } else {
      console.log('err');
    }
    // Add your login logic here
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1">
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            keyboardShouldPersistTaps="handled">
            <View className="h-[381">
              <View>
                <Image
                  source={require('../../assets/auth/MainSignIn.png')}
                  className="h-[400px] "
                  style={{width: screenWidth}}
                />
              </View>
              <View className="px-5">
                <View className="flex items-center">
                  <Text className="font-bold text-[24px] mb-4">Sign up</Text>
                </View>

                <View className="gap-y-4">
                  <AuthInput
                    placeholder="Name"
                    iconName="user-o"
                    libName={FontAwesome}
                    onChangeText={text => handleInputChange('name', text)}
                    border="#F67C3B"
                  />
                  <AuthInput
                    placeholder="Email"
                    iconName="email"
                    libName={Fontisto}
                    onChangeText={text => handleInputChange('email', text)}
                    border="#F67C3B"
                  />
                  <AuthInput
                    placeholder="Phone Number"
                    iconName="phone"
                    libName={FontAwesome}
                    onChangeText={text => handleInputChange('phone', text)}
                    border="#F67C3B"
                  />
                  <AuthInput
                    placeholder="Passwords"
                    iconName="lock"
                    libName={FontAwesome}
                    onChangeText={text => handleInputChange('password', text)}
                    border="#F67C3B"
                  />

                  <AuthButton
                    title={
                      loading ? (
                        <ActivityIndicator color="#fff" />
                      ) : (
                        'CREATE AN ACCOUNT'
                      )
                    }
                    bgColor="#F67C3B"
                    textColor="#fff"
                    onPress={handleSignUp}
                  />

                  <View className="flex-row items-center justify-center">
                    <Text className="font-semibold">
                      Already have an account?{' '}
                    </Text>
                    <NavigateButton
                      title="Sign In"
                      navigation={navigation}
                      color="#FF8000"
                      route="SignIn"
                    />
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default SignUp;
