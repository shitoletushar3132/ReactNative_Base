import AsyncStorage from '@react-native-async-storage/async-storage';

const removeUser = async key => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log(error);
  }
};

export {removeUser};
