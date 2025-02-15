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
import {signUpRequest} from '../../requests/auth/authRequest';
import {Snackbar} from 'react-native-paper';

const SignUp = ({navigation}) => {
  const screenWidth = Dimensions.get('window').width;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');

  const handleInputChange = (field, value) => {
    setFormData({...formData, [field]: value});
  };

  const handleSignUp = async () => {
    if (validateSignUpForm(formData, setSnackMessage)) {
      setLoading(true);

      try {
        const res = await signUpRequest(
          formData.name,
          formData.email,
          formData.phone,
          formData.password,
        );

        if (res?.data?.data) {
          setSnackbarVisible(true);
          setSnackMessage('Sign Up Successfully!!');
          setInterval(() => {
            navigation.navigate('SignIn');
          }, 1500);
        } else {
          setSnackbarVisible(true);
          setSnackMessage('User already exists');
        }
      } catch (error) {
        const errorMessage = error.message || 'Sign-up failed';
        setSnackbarVisible(true);
        setSnackMessage(errorMessage);
        console.log(error.response?.data?.message || errorMessage);
      } finally {
        setLoading(false);
      }
    } else {
      setSnackbarVisible(true);
    }
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
            <View>
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
                    border="#DD5411"
                  />
                  <AuthInput
                    placeholder="Email"
                    iconName="email"
                    libName={Fontisto}
                    onChangeText={text => handleInputChange('email', text)}
                    border="#DD5411"
                    focusBorder="#DB550C"
                  />
                  <AuthInput
                    placeholder="Phone Number"
                    iconName="phone"
                    libName={FontAwesome}
                    onChangeText={text => handleInputChange('phone', text)}
                    border="#DD5411"
                    focusBorder="#DB550C"
                  />
                  <AuthInput
                    placeholder="Passwords"
                    iconName="lock"
                    libName={FontAwesome}
                    onChangeText={text => handleInputChange('password', text)}
                    border="#DD5411"
                    focusBorder="#DB550C"
                  />

                  <AuthButton
                    title={
                      loading ? (
                        <ActivityIndicator color="#fff" />
                      ) : (
                        'CREATE AN ACCOUNT'
                      )
                    }
                    bgColor="#DD5411"
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

export default SignUp;
