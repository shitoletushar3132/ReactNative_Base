import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import addressData from '../../utils/data/addresses.json';
import AddressCard from '../../components/home/Profile/AddressCard';
import AuthInput from '../../components/auth/AuthInput';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Snackbar} from 'react-native-paper';
import validateAddressForm from '../../utils/Validation/address/addAddress';
import {addAddress, editAddress} from '../../requests/address/addressRequest';
import {AppContext} from '../../contextProvider/AppContext';

const AddAddress = () => {
  const {user, setRefreshData} = useContext(AppContext);
  const [formData, setFormData] = useState({
    streetAddress1: '',
    streetAddress2: '',
    city: '',
    pincode: '',
    state: '',
    phone: '',
    fullName: '',
  });

  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackMessage, setSnackMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (field, value) => {
    setFormData({...formData, [field]: value});
  };

  const screenWidth = Dimensions.get('window').width;
  const navigation = useNavigation();

  const [addAddressForm, setAddAddressForm] = useState(false);

  const handleAddAddress = async () => {
    if (validateAddressForm(formData, setSnackMessage)) {
      try {
        setLoading(true);
        const data = await addAddress({
          fullName: formData.fullName,
          streetAddress1: formData.streetAddress1,
          streetAddress2: formData.streetAddress2,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          phone: formData.phone,
        });
        // console.log(data);
        setSnackbarVisible(true);
        setSnackMessage(data?.data?.message);
        setAddAddressForm(false);
        setFormData({
          streetAddress1: '',
          streetAddress2: '',
          city: '',
          pincode: '',
          state: '',
          phone: '',
          fullName: '',
        });
        setRefreshData(prev => !prev);
      } catch (error) {
        setSnackMessage(error.message || 'Adding New Address failed.');
        setSnackbarVisible(true);
      } finally {
        setLoading(false);
      }
    } else {
      setSnackbarVisible(true);
    }
  };

  const handleEditAddress = async () => {
    if (validateAddressForm(formData, setSnackMessage)) {
      try {
        setLoading(true);
        const data = await editAddress({
          fullName: formData.fullName,
          streetAddress1: formData.streetAddress1,
          streetAddress2: formData.streetAddress2,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
          phone: formData.phone,
          addressId: formData.addressId,
        });
        // console.log(data);
        setSnackbarVisible(true);
        setSnackMessage(data?.data?.message);
        setAddAddressForm(false);
        setFormData({
          streetAddress1: '',
          streetAddress2: '',
          city: '',
          pincode: '',
          state: '',
          phone: '',
          fullName: '',
        });
        setRefreshData(prev => !prev);
      } catch (error) {
        setSnackMessage(error.message || 'Adding New Address failed.');
        setSnackbarVisible(true);
      } finally {
        setLoading(false);
      }
    } else {
      setSnackbarVisible(true);
    }
  };

  const handleShowEdit = ({address}) => {
    setIsEditing(true);
    setAddAddressForm(true);
    setFormData({
      ...address,
      streetAddress1: address.streetName1,
      streetAddress2: address.streetName2,
      addressId: address.addressId,
    });
  };

  const handleCanel = () => {
    setAddAddressForm(false);
    setFormData({
      streetAddress1: '',
      streetAddress2: '',
      city: '',
      pincode: '',
      state: '',
      phone: '',
      fullName: '',
    });
  };

  if (addAddressForm) {
    return (
      <SafeAreaView className="flex-1">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1">
            <ScrollView
              contentContainerStyle={{flexGrow: 1}}
              keyboardShouldPersistTaps="handled">
              <View className="px-5 mt-5">
                <View className="relative">
                  <TouchableOpacity
                    onPress={handleCanel}
                    style={{
                      position: 'absolute',
                      top: 1,
                      left: 0,
                      zIndex: 10,
                    }}>
                    <Ionicons name="arrow-back" size={24} color={'#000'} />
                  </TouchableOpacity>
                </View>
                <View className="items-center">
                  <Text className="text-[24px] font-medium">Add Address</Text>
                </View>
                <View className="gap-y-4 mt-5">
                  <View>
                    <Text style={{marginBottom: 8}}>
                      Full Name <Text className="text-red-500">*</Text>
                    </Text>

                    <AuthInput
                      placeholder="Full Name"
                      value={formData.fullName}
                      onChangeText={text => handleInputChange('fullName', text)}
                      border="#cbd5e1"
                      focusBorder="#DB550C"
                      iconName="user"
                      libName={FontAwesome}
                    />
                  </View>

                  <View>
                    <Text style={{marginBottom: 8}}>
                      Phone No. <Text className="text-red-500">*</Text>
                    </Text>

                    <AuthInput
                      placeholder="Phone"
                      value={formData.phone}
                      onChangeText={text => handleInputChange('phone', text)}
                      border="#cbd5e1"
                      focusBorder="#DB550C"
                      iconName="phone"
                      libName={FontAwesome}
                    />
                  </View>

                  <View>
                    <Text style={{marginBottom: 8}}>
                      Pincode <Text className="text-red-500">*</Text>
                    </Text>

                    <AuthInput
                      placeholder="Pincode"
                      value={formData.pincode}
                      onChangeText={text => handleInputChange('pincode', text)}
                      border="#cbd5e1"
                      focusBorder="#DB550C"
                      iconName="envelope"
                      libName={FontAwesome}
                    />
                  </View>

                  <View>
                    <Text style={{marginBottom: 8}}>
                      State <Text className="text-red-500">*</Text>
                    </Text>

                    <AuthInput
                      placeholder="State"
                      value={formData.state}
                      onChangeText={text => handleInputChange('state', text)}
                      border="#cbd5e1"
                      focusBorder="#DB550C"
                      iconName="flag"
                      libName={FontAwesome}
                    />
                  </View>

                  <View>
                    <Text style={{marginBottom: 8}}>
                      City <Text className="text-red-500">*</Text>
                    </Text>

                    <AuthInput
                      placeholder="City"
                      value={formData.city}
                      onChangeText={text => handleInputChange('city', text)}
                      border="#cbd5e1"
                      focusBorder="#DB550C"
                      iconName="building"
                      libName={FontAwesome}
                    />
                  </View>

                  <View>
                    <Text style={{marginBottom: 8}}>
                      Street Address 1 <Text className="text-red-500">*</Text>
                    </Text>

                    <AuthInput
                      placeholder="Street Address 1"
                      value={formData.streetAddress1}
                      onChangeText={text =>
                        handleInputChange('streetAddress1', text)
                      }
                      border="#cbd5e1"
                      focusBorder="#DB550C"
                      iconName="map-marker"
                      libName={FontAwesome}
                    />
                  </View>

                  <View>
                    <Text style={{marginBottom: 8}}>
                      Street Address 2 <Text className="text-red-500">*</Text>
                    </Text>

                    <AuthInput
                      placeholder="Street Address 2"
                      value={formData.streetAddress2}
                      onChangeText={text =>
                        handleInputChange('streetAddress2', text)
                      }
                      border="#cbd5e1"
                      focusBorder="#DB550C"
                      iconName="map-marker"
                      libName={FontAwesome}
                    />
                  </View>
                </View>

                <View className="flex-row justify-between gap-x-3 mt-8">
                  <TouchableOpacity
                    className="py-2  flex-1 items-center bg-[#777] rounded-lg"
                    onPress={() => setAddAddressForm(false)}>
                    <Text className="font-bold text-white">Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="py-2 flex-1 items-center rounded-lg"
                    style={{backgroundColor: loading ? '#A74C0E' : '#DD5411'}}
                    onPress={isEditing ? handleEditAddress : handleAddAddress}
                    disabled={loading}>
                    {loading ? (
                      <ActivityIndicator color="#FFF" />
                    ) : (
                      <Text className="font-bold text-white">
                        {isEditing ? 'Edit Address' : 'Add Address'}
                      </Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
              <Snackbar
                visible={snackbarVisible}
                onDismiss={() => setSnackbarVisible(false)}
                action={{label: 'OK', onPress: () => setSnackbarVisible(false)}}
                style={{marginBottom: 10}}>
                <Text className="text-red-500">{snackMessage}</Text>
              </Snackbar>
            </ScrollView>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        {/* Back Button and Image */}
        <View className="relative">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{position: 'absolute', top: 10, left: 10, zIndex: 10}}>
            <Ionicons name="arrow-back" size={24} color={'#000'} />
          </TouchableOpacity>

          <Image
            source={require('../../assets/profile/Address.png')}
            className="h-[360px]"
            resizeMode="cover"
            style={{width: screenWidth}}
          />
        </View>

        {/* New Address Button */}
        <View className="px-4 mt-4 flex-row items-center justify-center">
          <TouchableOpacity
            onPress={() => {
              setAddAddressForm(prev => !prev), setIsEditing(false);
            }} // Open the modal
            className="flex-row items-center justify-center bg-white px-4 py-2 rounded-lg shadow-xl shadow-black">
            <Text className="text-lg font-bold text-[#DB550C] mr-2">
              New Address
            </Text>
            <Octicons name="diff-added" size={18} color={'#DB550C'} />
          </TouchableOpacity>
        </View>

        {/* Address List */}
        <View className="flex-1 mt-4 px-4">
          <FlatList
            className="px-2"
            data={user?.address}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <AddressCard address={item} handleShowEdit={handleShowEdit} />
            )}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <Snackbar
          visible={snackbarVisible}
          onDismiss={() => setSnackbarVisible(false)}
          action={{label: 'OK', onPress: () => setSnackbarVisible(false)}}
          style={{marginBottom: 10}}>
          <Text className="text-red-500">{snackMessage}</Text>
        </Snackbar>
      </View>
    </SafeAreaView>
  );
};

export default AddAddress;
