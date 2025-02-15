import React, {useCallback, useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Image,
  Dimensions,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import AuthInput from '../../components/auth/AuthInput';
import AuthButton from '../../components/auth/AuthButton';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Snackbar, Avatar} from 'react-native-paper';
import * as ImagePicker from 'react-native-image-picker';
import {AppContext} from '../../contextProvider/AppContext';
import {editProfile, editProfilePhoto} from '../../requests/auth/authRequest';
import validateEditForm from '../../utils/Validation/auth/edit';
import {ImageUri, SERVER} from '../../utils/constant';

const EditProfile = ({navigation}) => {
  const {user, setRefreshData} = useContext(AppContext);
  const [formData, setFormData] = useState({
    fullName: user?.fullName,
    email: user?.email,
    phone: user?.phone,
    country: '',
    gender: '',
    profileImage: null,
  });

  const [loading, setLoading] = useState(false);
  const [imageEdit, setImageEdit] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');

  const handleInputChange = useCallback((field, value) => {
    setFormData(prev => ({...prev, [field]: value}));
  }, []);

  const handleSaveProfile = async () => {
    try {
      if (validateEditForm(formData, setSnackMessage)) {
        setLoading(true);
        // Add API call for updating profile here

        if (formData.profileImage && imageEdit) {
          const profile = await editProfilePhoto(formData.profileImage);
        }

        const data = await editProfile({
          fullName: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          gender: formData.gender,
        });

        setSnackMessage('Profile updated successfully!');
        setSnackbarVisible(true);
        setRefreshData(prev => !prev);
      } else {
        setSnackbarVisible(true);
      }
    } catch (error) {
      setSnackMessage(error.message || 'Profile update failed.');
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    ImagePicker.launchImageLibrary(
      {mediaType: 'photo', quality: 1},
      response => {
        if (response.assets && response.assets.length > 0) {
          const asset = response.assets[0];
          setFormData(prev => ({
            ...prev,
            profileImage: {
              uri: asset.uri,
              name: asset.fileName || 'profile.jpg',
              type: asset.type || 'image/jpeg',
            }, // Directly set the URI
          }));
        }
      },
    );
    setImageEdit(true);
  };

  useEffect(() => {
    console.log(``);
    if (user) {
      setFormData({
        fullName: user.fullName || '',
        email: user.email || '',
        phone: user.phone || '',
        country: user.country || '', // Preserve previous values
        gender: user.gender || '',
        profileImage: user.image || null,
      });
    }
  }, [user]);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1">
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            keyboardShouldPersistTaps="handled">
            <View className="p-5">
              {/* <View className="items-center">
                <Text className="text-[24px] font-medium">Edit Profile</Text>
              </View> */}

              <View className="items-center mt-5">
                <TouchableOpacity onPress={pickImage}>
                  {formData.profileImage ? (
                    <Avatar.Image
                      size={100}
                      source={{
                        uri:
                          formData.profileImage.uri ||
                          `${ImageUri}/${user.image}`,
                      }}
                    />
                  ) : (
                    <Avatar.Icon size={100} icon="camera" />
                  )}
                </TouchableOpacity>
              </View>

              <View className="gap-y-6 mt-5">
                <View>
                  <Text
                    style={{fontSize: 13, fontWeight: '400', marginBottom: 8}}>
                    Full Name
                  </Text>
                  <AuthInput
                    placeholder="Full Name"
                    iconName="user"
                    libName={FontAwesome}
                    border="#cbd5e1"
                    focusBorder="#DB550C"
                    value={formData.fullName}
                    onChangeText={text => handleInputChange('fullName', text)}
                    accessibilityLabel="Full Name Input" // Improves accessibility
                  />
                </View>

                <View>
                  <Text
                    style={{fontSize: 13, fontWeight: '400', marginBottom: 8}}>
                    Email
                  </Text>
                  <AuthInput
                    placeholder="Email"
                    iconName="envelope"
                    libName={FontAwesome}
                    border="#cbd5e1"
                    focusBorder="#DB550C"
                    value={formData.email}
                    onChangeText={text => handleInputChange('email', text)}
                  />
                </View>

                <View>
                  <Text
                    style={{fontSize: 13, fontWeight: '400', marginBottom: 8}}>
                    Phone No.
                  </Text>
                  <AuthInput
                    placeholder="Phone"
                    iconName="phone"
                    libName={FontAwesome}
                    border="#cbd5e1"
                    focusBorder="#DB550C"
                    value={formData.phone}
                    onChangeText={text => handleInputChange('phone', text)}
                  />
                </View>

                <View>
                  <Text
                    style={{fontSize: 13, fontWeight: '400', marginBottom: 8}}>
                    Country
                  </Text>
                  <AuthInput
                    placeholder="Country"
                    iconName="globe"
                    libName={FontAwesome}
                    border="#cbd5e1"
                    focusBorder="#DB550C"
                    value={formData.country}
                    onChangeText={text => handleInputChange('country', text)}
                  />
                </View>

                <View>
                  <Text
                    style={{fontSize: 13, fontWeight: '400', marginBottom: 8}}>
                    Gender
                  </Text>
                  <AuthInput
                    placeholder="Gender"
                    iconName="transgender"
                    libName={FontAwesome}
                    border="#cbd5e1"
                    focusBorder="#DB550C"
                    value={formData.gender}
                    onChangeText={text => handleInputChange('gender', text)}
                  />
                </View>
              </View>

              <View className="mt-8">
                <AuthButton
                  title={loading ? <ActivityIndicator color="#fff" /> : 'Save'}
                  onPress={handleSaveProfile}
                  bgColor="#DD5411"
                  textColor="#fff"
                />
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

export default EditProfile;
