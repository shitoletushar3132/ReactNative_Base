import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Image,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import AuthInput from '../../components/auth/AuthInput';
import AuthButton from '../../components/auth/AuthButton';
import NavigateButton from '../../components/NavigateButton';
import validateFormSignIn from '../../utils/Validation/auth/signIn';
import '../../../global.css';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SignIn = ({navigation}) => {
  const [formData, setFormData] = useState({email: '', password: ''});
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData({...formData, [field]: value});
  };

  const handleLogin = () => {
    if (
      {
        /*validateFormSignIn(formData)*/
      }
    ) {
      setLoading(true);
      setTimeout(() => {
        console.log('Form Data:', formData);
        setLoading(false);
        navigation.navigate('MainTabs');
      }, 1000);
    } else {
      console.log('err');
    }
  };

  const screenWidth = Dimensions.get('window').width;

  return (
    <SafeAreaView className="flex-1">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1">
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            keyboardShouldPersistTaps="handled">
            <View>
              <Image
                source={require('../../assets/auth/MainSignIn.png')}
                className="h-[440px]"
                style={{width: screenWidth}}
              />
            </View>
            <View className="px-5">
              <View className="items-center">
                <Text className="text-[24px] font-medium">Sign In</Text>
              </View>

              <View className="gap-y-4 mt-5">
                <AuthInput
                  placeholder="Email or Mobile number"
                  iconName="user-o"
                  libName={FontAwesome}
                  border="#FF8000"
                  value={formData.email}
                  onChangeText={text => handleInputChange('email', text)}
                />
                <AuthInput
                  placeholder="Password"
                  border="#FF8000"
                  iconName="lock"
                  libName={FontAwesome}
                  secureTextEntry
                  value={formData.password}
                  onChangeText={text => handleInputChange('password', text)}
                />
              </View>

              <View className="mt-2 items-end">
                <NavigateButton
                  title="Forget Password?"
                  navigation={navigation}
                  route="ForgotPassword"
                />
              </View>

              <View className="mt-8">
                <AuthButton
                  title={loading ? <ActivityIndicator color="#fff" /> : 'Login'}
                  onPress={handleLogin}
                  bgColor="#F67C3B"
                  textColor="#fff"
                />
                <View className="mt-2 flex-row items-center">
                  <Text className="font-semibold">New User? </Text>
                  <NavigateButton
                    title="Sign Up"
                    navigation={navigation}
                    color="#FF8000"
                    route="SignUp"
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default SignIn;
