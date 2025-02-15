import {getData} from '../../Storage/getDataLocal';
import {storeToken, userData} from '../../Storage/userData';
import {axiosInstance} from '../axiosInstance';

const signUpRequest = async (fullName, email, phoneNumber, password) => {
  try {
    const res = await axiosInstance.post('/api/v1/user/register', {
      fullName,
      email,
      phoneNumber,
      password,
    });
    await storeToken(res.data.data);
    return res;
  } catch (error) {
    console.error(error.response?.data?.message || 'Registration failed');
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

const signInRequest = async (phone, password) => {
  try {
    const res = await axiosInstance.post('/api/v1/user/login', {
      phone,
      password,
    });

    await storeToken(res.data.data);
    return res;
  } catch (error) {
    await storeToken(null);
    console.error(error.response?.data?.message || 'Login failed');
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

const getUserData = async () => {
  try {
    const accessToken = await getData('accessToken');
    if (accessToken) {
      const res = await axiosInstance.get('/api/v1/user/get', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(res);
      await userData(res.data.data);
      return res;
    }
  } catch (error) {
    console.error(error.response?.data?.message || 'Failed to fetch user data');
    throw new Error(
      error.response?.data?.message || 'Failed to fetch user data',
    );
  }
};

const editProfile = async ({fullName, email, phone, country, gender}) => {
  try {
    const accessToken = await getData('accessToken');
    if (accessToken) {
      const res = await axiosInstance.put(
        '/api/v1/user/update',
        {fullName, email, phone, country, gender}, // <-- Pass the data here
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
    console.error(error.response?.data?.message || 'Profile Update failed');
    throw new Error(error.response?.data?.message || 'Profile Update failed');
  }
};

const editProfilePhoto = async profileImage => {
  try {
    const accessToken = await getData('accessToken');
    if (accessToken) {
      const formData = new FormData();

      formData.append(
        'profileImage',
        formData.append('profileImage', {
          uri: profileImage.uri,
          name: profileImage.name,
          type: profileImage.type,
        }),
      );

      const res = await axiosInstance.put('/api/v1/user/update', formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(res);
      return res;
    }
  } catch (error) {
    console.log(error.response);
    console.error(
      error.response?.data?.message || 'Profile Image Upload failed',
    );
    throw new Error(
      error.response?.data?.message || 'Profile Image Upload failed',
    );
  }
};

export {
  signInRequest,
  signUpRequest,
  getUserData,
  editProfile,
  editProfilePhoto,
};
