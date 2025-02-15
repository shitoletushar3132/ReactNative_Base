import {getData} from '../../Storage/getDataLocal';
import {axiosInstance} from '../axiosInstance';

const addAddress = async ({
  streetAddress1,
  streetAddress2,
  city,
  pincode,
  state,
  phone,
  fullName,
}) => {
  try {
    const accessToken = await getData('accessToken');
    if (accessToken) {
      const res = await axiosInstance.post(
        '/api/v1/user/address/add',
        {
          streetAddress1,
          streetAddress2,
          city,
          pincode,
          phone,
          state,
          fullName,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      console.log(res);
      return res;
    }
  } catch (error) {
    console.log(error);
    console.log(error.response);
    console.error(error.response?.data?.message);
    throw new Error(
      error.response?.data?.message || 'Failed to fetch user data',
    );
  }
};

const editAddress = async ({
  streetAddress1,
  streetAddress2,
  city,
  pincode,
  state,
  phone,
  fullName,
  addressId,
}) => {
  try {
    const accessToken = await getData('accessToken');
    if (accessToken) {
      const res = await axiosInstance.put(
        '/api/v1/user/address/edit',
        {
          streetAddress1,
          streetAddress2,
          city,
          pincode,
          phone,
          state,
          fullName,
          addressId,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      console.log(res);
      return res;
    }
  } catch (error) {
    console.log(error);
    console.log(error.response);
    console.error(error.response?.data?.message);
    throw new Error(error.response?.data?.message || 'Failed to Edit Address');
  }
};

const deleteAddress = async ({addressId}) => {
  try {
    const accessToken = await getData('accessToken');
    if (accessToken) {
      const res = await axiosInstance.delete(
        `/api/v1/user/address/delete/${addressId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      console.log(res);
      return res;
    }
  } catch (error) {
    console.log(error);
    console.log(error.response);
    console.error(error.response?.data?.message || 'Failed to delete address');
    throw new Error(
      error.response?.data?.message || 'Failed to delete address',
    );
  }
};

export {addAddress, editAddress, deleteAddress};
