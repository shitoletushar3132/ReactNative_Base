import AsyncStorage from '@react-native-async-storage/async-storage';

const getData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    console.log(value);
    return value;
  } catch (e) {
    console.error('Error reading value:', e);
    return null;
  }
};

const getUserLocal = async key => {
  try {
    console.log('key', key);
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.log(error);
  }
};

export {getData, getUserLocal};
