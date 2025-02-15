// AddressForm.js
import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AuthInput from '../../../auth/AuthInput';

const AddressForm = ({
  formData,
  errors,
  handleInputChange,
  onCancel,
  onSubmit,
}) => {
  return (
    <View className="px-5 mt-5">
      <View className="gap-y-4 mt-5">
        {/* Full Name */}
        <View>
          <Text>
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
          {errors.fullName && (
            <Text className="text-red-500">{errors.fullName}</Text>
          )}
        </View>

        {/* Street Address 1 */}
        <View>
          <Text>
            Street Address 1 <Text className="text-red-500">*</Text>
          </Text>
          <AuthInput
            placeholder="Street Address 1"
            value={formData.streetAddress1}
            onChangeText={text => handleInputChange('streetAddress1', text)}
            border="#cbd5e1"
            focusBorder="#DB550C"
            iconName="map-marker"
            libName={FontAwesome}
          />
          {errors.streetAddress1 && (
            <Text className="text-red-500">{errors.streetAddress1}</Text>
          )}
        </View>

        {/* Street Address 2 */}
        <View>
          <Text>
            Street Address 2 <Text className="text-red-500">*</Text>
          </Text>
          <AuthInput
            placeholder="Street Address 2"
            value={formData.streetAddress2}
            onChangeText={text => handleInputChange('streetAddress2', text)}
            border="#cbd5e1"
            focusBorder="#DB550C"
            iconName="map-marker"
            libName={FontAwesome}
          />
          {errors.streetAddress2 && (
            <Text className="text-red-500">{errors.streetAddress2}</Text>
          )}
        </View>

        {/* City */}
        <View>
          <Text>
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
          {errors.city && <Text className="text-red-500">{errors.city}</Text>}
        </View>

        {/* Pincode */}
        <View>
          <Text>
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
          {errors.pincode && (
            <Text className="text-red-500">{errors.pincode}</Text>
          )}
        </View>

        {/* State */}
        <View>
          <Text>
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
          {errors.state && <Text className="text-red-500">{errors.state}</Text>}
        </View>

        {/* Phone Number */}
        <View>
          <Text>
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
          {errors.phone && <Text className="text-red-500">{errors.phone}</Text>}
        </View>
      </View>

      {/* Cancel and Submit Buttons */}
      <View className="flex-row justify-between gap-x-3 mt-8">
        <TouchableOpacity
          className="py-2 flex-1 items-center bg-[#777] rounded-lg"
          onPress={onCancel}>
          <Text className="font-bold text-white">Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="py-2 flex-1 items-center bg-[#DD5411] rounded-lg"
          onPress={onSubmit}>
          <Text className="font-bold text-white">Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AddressForm;
