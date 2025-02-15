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
import {signInRequest} from '../../requests/auth/authRequest';
import {Snackbar} from 'react-native-paper';

const SignIn = ({navigation}) => {
  const [formData, setFormData] = useState({
    phone: '0987654321',
    password: 'Demo@123',
  });
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');

  const handleInputChange = (field, value) => {
    setFormData({...formData, [field]: value});
  };

  const handleLogin = async () => {
    try {
      if (validateFormSignIn(formData, setSnackMessage)) {
        setLoading(true);
        const res = await signInRequest(formData.phone, formData.password);

        if (res?.data?.data) {
          navigation.navigate('MainTabs');
        } else {
          setSnackbarVisible(true);
          setSnackMessage('Invalid credentials. Please try again.');
        }
      } else {
        setSnackbarVisible(true);
        // setSnackMessage('Please enter valid credentials.');
      }
    } catch (error) {
      setSnackbarVisible(true);
      setSnackMessage(error.message || 'Login failed. Try again.');
    } finally {
      setLoading(false);
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
                  focusBorder="#DB550C"
                  border="#FF8000"
                  value={formData.phone}
                  onChangeText={text => handleInputChange('phone', text)}
                />
                <AuthInput
                  placeholder="Password"
                  border="#FF8000"
                  iconName="lock"
                  focusBorder="#DB550C"
                  libName={FontAwesome}
                  // secureTextEntry
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
                  bgColor="#DD5411"
                  textColor="#fff"
                />
                <View className="mt-4 flex-row items-center justify-center ">
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
            <Snackbar
              visible={snackbarVisible}
              onDismiss={() => setSnackbarVisible(false)}
              action={{
                label: 'OK',
                onPress: () => setSnackbarVisible(false),
              }}
              style={{marginBottom: 10}}>
              <Text className="text-red-500">{snackMessage}</Text>
            </Snackbar>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default SignIn;
