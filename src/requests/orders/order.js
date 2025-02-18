import {getData} from '../../Storage/getDataLocal';
import {axiosInstance} from '../axiosInstance';

const getAllOrders = async navigation => {
  try {
    const accessToken = await getData('accessToken');
    if (!accessToken) {
      console.log('No token found, redirecting to login');
      navigation.navigate('Auth');
      return;
    }

    const res = await axiosInstance.get(`/api/v1/payment/my-orders`, {
      headers: {Authorization: `Bearer ${accessToken}`},
    });

    console.log(res);
    return res;
  } catch (error) {
    console.error(error);
    console.error(error.response?.data?.message || ' Failed to get All orders');
    throw new Error(
      error.response?.data?.message || ' Failed to get All orders',
    );
  }
};

const getDetailOrder = async (navigation, orderId) => {
  try {
    const accessToken = await getData('accessToken');
    if (!accessToken) {
      console.log('No token found, redirecting to login');
      navigation.navigate('Auth');
      return;
    }

    const res = await axiosInstance.get(
      `/api/v1/payment/get/single/order/user/${orderId}`,
      {
        headers: {Authorization: `Bearer ${accessToken}`},
      },
    );

    console.log(res);
    return res;
  } catch (error) {
    console.error(error.response?.data?.message || 'Failed to get the Detail');
    throw new Error(
      error.response?.data?.message || 'Failed to get the Detail',
    );
  }
};

export {getAllOrders, getDetailOrder};
