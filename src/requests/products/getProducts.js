import {axiosInstance} from '../axiosInstance';

const getAllProducts = async (
  page = 1,
  limit = 10,
  catagory = '',
  search = '',
  keyword = '',
) => {
  try {
    const queryParams = new URLSearchParams();

    if (catagory) queryParams.append('catagory', catagory);
    if (search) queryParams.append('search', search);
    if (keyword) queryParams.append('keyword', keyword);

    const res = await axiosInstance.get(
      `/api/v1/product/get/all/${page}/${limit}?${queryParams}`,
    );

    console.log(`/api/v1/product/get/all/${page}/${limit}?${queryParams}`);
    console.log(res);
    return res;
  } catch (error) {
    if (error.response) {
      console.error(error.response.data.message || 'Request failed');
    } else {
      console.error('An error occurred:', error.message);
    }
    throw new Error(error.response?.data?.message || 'Request failed');
  }
};

const getAllCategory = async (page = 1, limit = 10) => {
  console.log(page);
  try {
    const res = await axiosInstance.get(
      `/api/v1/product/catagory/get/all/${page}/${limit}`,
    );
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    console.log(error.response);
    console.error(error.response?.data?.message || 'Registration failed');
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

const getAllBanners = async () => {
  try {
    const res = await axiosInstance.get(`/api/v1/banners/all`);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    console.log(error.response);
    console.error(error.response?.data?.message || 'Registration failed');
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

const getVideos = async (limit = 10) => {
  try {
    const res = await axiosInstance.get(
      `/api/v1/product/review/video/get/all/${3}`,
    );
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    console.log(error.response);
    console.error(error.response?.data?.message || 'Registration failed');
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

const getProductDetails = async ({id}) => {
  try {
    const res = await axiosInstance.get(`/api/v1/product/get/single/${id}`);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    console.log(error.response);
    console.error(error.response?.data?.message || 'Registration failed');
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

const getReviews = async ({id, page = 1}) => {
  try {
    const res = await axiosInstance.get(
      `/api/v1/product/review/get/all/${id}/${page}`,
    );
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
    console.log(error.response);
    console.error(error.response?.data?.message || 'Registration failed');
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

const addReview = async ({id, comment, rating}) => {
  try {
    const res = await axiosInstance.post(`/api/v1/product/review/add`, {
      rating,
      comment,
      productId: id,
      date: new Date().toLocaleDateString(),
    });
    return res;
  } catch (error) {
    console.log(error);
    console.log(error.response);
    console.error(error.response?.data?.message || 'Fail to Add Review');
    throw new Error(error.response?.data?.message || 'Fail to Add Review');
  }
};

export {
  getAllProducts,
  getAllCategory,
  getAllBanners,
  getVideos,
  getProductDetails,
  getReviews,
  addReview,
};
