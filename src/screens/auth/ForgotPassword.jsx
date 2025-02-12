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
import NavigateButton from '../../components/NavigateButton';
import validatePasswordForm from '../../utils/Validation/auth/Forgotpassword';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ForgotPassword = ({navigation}) => {
  const screenWidth = Dimensions.get('window').width; // Get screen width
  const [formData, setFormData] = useState({
    phone: '',
    newPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData({...formData, [field]: value});
  };

  const handleFogotPassword = () => {
    if (validatePasswordForm(formData)) {
      setLoading(true);
      setTimeout(() => {
        console.log('Form Data:', formData);
        setLoading(false);
      }, 3000);
    } else {
      console.log('err');
    }
  };
  return (
    <SafeAreaView className="flex-1  bg-white">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1">
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            keyboardShouldPersistTaps="handled">
            <View className="items-center">
              <Image
                source={require('../../assets/auth/MainForgot.png')}
                className="h-[450px] "
                style={{width: screenWidth}}
              />
            </View>

            <View className="px-5 mt-8">
              <View className=" gap-y-5">
                <AuthInput
                  placeholder="Phone no."
                  iconName="phone"
                  border="#FF8000"
                  libName={FontAwesome}
                  value={formData.phone}
                  onChangeText={text => handleInputChange('phone', text)}
                />
                <AuthInput
                  placeholder="New Password"
                  iconName="lock"
                  libName={FontAwesome}
                  secureTextEntry
                  border="#FF8000"
                  value={formData.newPassword}
                  onChangeText={text => handleInputChange('newPassword', text)}
                />
                <AuthButton
                  title={
                    loading ? (
                      <ActivityIndicator color="#fff" />
                    ) : (
                      'Forgot Password'
                    )
                  }
                  onPress={handleFogotPassword}
                  bgColor="#F67C3B"
                  textColor="#fff"
                />
              </View>

              <View className="mt-2 flex-row items-center">
                <Text className="font-semibold">Already Login? </Text>
                <NavigateButton
                  title="Sign In"
                  navigation={navigation}
                  color="#FF8000"
                  route="SignIn"
                />
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default ForgotPassword;
