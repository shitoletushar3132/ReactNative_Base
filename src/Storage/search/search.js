import AsyncStorage from '@react-native-async-storage/async-storage';

const saveRecentSearch = async searchText => {
  try {
    const existingSearches = await AsyncStorage.getItem('recentSearch');
    let searches = existingSearches ? JSON.parse(existingSearches) : [];

    // Prevent duplicates and limit to last 5 searches
    if (!searches.includes(searchText)) {
      searches.unshift(searchText);
      if (searches.length > 5) searches.pop();
      await AsyncStorage.setItem('recentSearch', JSON.stringify(searches));
    }
  } catch (e) {
    console.error('Error saving recent search:', e);
  }
};
const getRecentSearch = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('recentSearch');
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error(e);
  }
};

export {saveRecentSearch, getRecentSearch};
