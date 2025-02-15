import AsyncStorage from '@react-native-async-storage/async-storage';

const storeToken = async accessToken => {
  try {
    console.log(accessToken);
    await AsyncStorage.setItem('accessToken', accessToken);
  } catch (e) {
    console.error(e);
  }
};

const userData = async userData => {
  try {
    const jsonValue = JSON.stringify(userData);
    await AsyncStorage.setItem('user-data', jsonValue);
  } catch (e) {
    console.error(e);
  }
};




// const cartItems = async cartData => {
//   try {
//     await AsyncStorage.setItem('')
//   } catch (e) {
//     console.error(e);
//   }
// };

export {storeToken, userData};
