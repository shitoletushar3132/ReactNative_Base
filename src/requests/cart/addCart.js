import {getData} from '../../Storage/getDataLocal';
import {axiosInstance} from '../axiosInstance';

const addToCart = async ({
  productId,
  productQuantity,
  discount,
  totalPrice,
  productTitle,
  productImage,
  productVariant,
  productCatagory,
  navigation,
}) => {
  try {
    const accessToken = await getData('accessToken');
    if (!accessToken) {
      console.log('No token found, redirecting to login');
      navigation.navigate('Auth');
      return;
    }

    const res = await axiosInstance.post(
      `/api/v1/cart/add`,
      {
        productId,
        productQuantity,
        discount,
        totalPrice,
        productTitle,
        productImage,
        productVariant,
        productCatagory,
      },
      {
        headers: {Authorization: `Bearer ${accessToken}`},
      },
    );

    console.log(res);
    return res;
  } catch (error) {
    console.error(error.response?.data?.message || 'Add To Cart failed');
    throw new Error(error.response?.data?.message || 'Add To Cart failed');
  }
};

const getAllCart = async navigation => {
  try {
    const accessToken = await getData('accessToken');
    if (!accessToken) {
      console.log('No token found, redirecting to login');
      navigation.navigate('Auth');
      return;
    }

    const res = await axiosInstance.get(`/api/v1/cart/get/all`, {
      headers: {Authorization: `Bearer ${accessToken}`},
    });

    console.log(res);
    return res;
  } catch (error) {
    console.error(error.response?.data?.message || 'Get Cart failed');
    throw new Error(error.response?.data?.message || 'Get Cart failed');
  }
};

const editProductQuantity = async ({itemId, value, navigation}) => {
  try {
    const accessToken = await getData('accessToken');
    if (!accessToken) {
      console.log('No token found, redirecting to login');
      navigation.navigate('Auth');
      return;
    }

    const res = await axiosInstance.put(
      `/api/v1/cart/quantity/edit`,
      {itemId, value},
      {
        headers: {Authorization: `Bearer ${accessToken}`},
      },
    );
    console.log(res);
    return res;
  } catch (error) {
    console.error(error.response?.data?.message || 'Quantity Edit failed');
    throw new Error(error.response?.data?.message || 'Quantity Edit failed');
  }
};

const deleteCartProduct = async ({itemId, navigation}) => {
  try {
    const accessToken = await getData('accessToken');
    if (!accessToken) {
      console.log('No token found, redirecting to login');
      navigation.navigate('Auth');
      return;
    }

    const res = await axiosInstance.delete(`/api/v1/cart/remove/${itemId}`, {
      headers: {Authorization: `Bearer ${accessToken}`},
    });

    console.log(res);
    return res;
  } catch (error) {
    console.error(error.response?.data?.message || 'Product Deletion failed');
    throw new Error(error.response?.data?.message || 'Product Deletion failed');
  }
};

const getCoupons = async navigation => {
  try {
    const accessToken = await getData('accessToken');
    if (!accessToken) {
      console.log('No token found, redirecting to login');
      navigation.navigate('Auth');
      return;
    }

    const res = await axiosInstance.get(`/api/v1/coupon/user/get/all`, {
      headers: {Authorization: `Bearer ${accessToken}`},
    });

    console.log(res);
    return res;
  } catch (error) {
    console.error(error.response?.data?.message || 'Get Coupons failed');
    throw new Error(error.response?.data?.message || 'Get Coupons failed');
  }
};

const getAllCharges = async navigation => {
  try {
    const accessToken = await getData('accessToken');
    if (!accessToken) {
      console.log('No token found, redirecting to login');
      navigation.navigate('Auth');
      return;
    }

    const res = await axiosInstance.get(`/api/v1/charges/user/get/all`, {
      headers: {Authorization: `Bearer ${accessToken}`},
    });

    console.log(res);
    return res;
  } catch (error) {
    console.error(error.response?.data?.message || 'Get Charges failed');
    throw new Error(error.response?.data?.message || 'Get Charges failed');
  }
};

const getApplyCoupon = async ({couponName, navigation}) => {
  try {
    const accessToken = await getData('accessToken');
    if (!accessToken) {
      console.log('No token found, redirecting to login');
      navigation.navigate('Auth');
      return;
    }

    const res = await axiosInstance.get(
      `/api/v1/coupon/get/single/${couponName}`,
      {
        headers: {Authorization: `Bearer ${accessToken}`},
      },
    );

    console.log(res);
    return res;
  } catch (error) {
    console.error(error.response?.data?.message || 'Apply Coupon failed');
    throw new Error(error.response?.data?.message || 'Apply Coupon failed');
  }
};

export {
  addToCart,
  getAllCart,
  editProductQuantity,
  deleteCartProduct,
  getCoupons,
  getAllCharges,
  getApplyCoupon,
};
