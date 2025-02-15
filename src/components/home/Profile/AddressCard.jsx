import {View, Text, TouchableOpacity, ActivityIndicator} from 'react-native';
import React, {useContext, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {deleteAddress} from '../../../requests/address/addressRequest';
import {AppContext} from '../../../contextProvider/AppContext';

const AddressCard = ({address, handleShowEdit}) => {
  const {user, setRefreshData} = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  const {addressId, fullName, streetName1, streetName2, city, state, pincode} =
    address;

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteAddress({addressId});
      setRefreshData(prev => !prev);
    } catch (error) {
      console.error('Failed to delete address:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="bg-white p-4 rounded-lg shadow-md mb-3 border border-gray-200 relative">
      {/* Delete Button */}
      <TouchableOpacity
        className="absolute right-2 top-2"
        onPress={handleDelete}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#f87171" />
        ) : (
          <MaterialCommunityIcons name="delete" size={20} color="#f87171" />
        )}
      </TouchableOpacity>

      {/* Edit Button */}
      <TouchableOpacity
        className="absolute right-10 top-2"
        onPress={() => handleShowEdit({address})}>
        <MaterialCommunityIcons
          name="application-edit"
          size={20}
          color={'#777'}
        />
      </TouchableOpacity>

      {/* Address Details */}
      <View className="flex-row items-center mb-2">
        <Text className="text-lg font-bold text-gray-800 mr-5">{fullName}</Text>
        <Text className="font-bold text-gray-800">Pincode: {pincode}</Text>
      </View>

      <Text className="text-gray-700">
        Address: {streetName1}, {streetName2}, {city}, {state}, {pincode}
      </Text>
    </View>
  );
};

export default AddressCard;
