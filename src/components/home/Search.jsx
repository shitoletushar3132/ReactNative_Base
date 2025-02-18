import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  SafeAreaView,
  TextInput,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {getAllProducts} from '../../requests/products/getProducts';
import {ImageUri} from '../../utils/constant';

const Search = ({navigation}) => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async text => {
    setQuery(text);
    if (text.trim().length > 0) {
      try {
        const searchResult = await getAllProducts(1, 15, '', text);
        if (searchResult?.data?.data?.data) {
          setSearchResults(searchResult.data.data.data); // Ensures the latest results are set
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error('Search Error:', error);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1">
          <View className="p-4">
            {/* Back Arrow & Search Bar in One Line */}
            <View className="flex-row items-center space-x-2 border border-gray-300 rounded-full px-3 py-2 bg-gray-100">
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                className="p-1">
                <Icon name="arrow-back" size={24} color="black" />
              </TouchableOpacity>
              <TextInput
                placeholder="Search for products, category..."
                placeholderTextColor="gray"
                className="flex-1 text-base text-black"
                value={query}
                onChangeText={handleSearch}
              />
              <Icon name="search" size={24} color="gray" />
            </View>

            {/* Recent Searches */}
            {/* {query.length === 0 && recentSearches.length > 0 && (
              <View className="mt-6">
                <Text className="text-lg font-bold text-gray-700">
                  Recent Searches
                </Text>
                <View className="mt-2">
                  {recentSearches.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleSearch(item)}
                      className="py-2">
                      <Text className="text-base text-gray-500">{item}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )} */}

            {/* Search Results */}

            {query === '' && (
              <View className="flex items-center mt-4">
                <Text className="text-gray-500 text-lg">
                  Please search something
                </Text>
              </View>
            )}

            <FlatList
              data={searchResults}
              keyExtractor={(item, index) =>
                item?._id?.toString() || index.toString()
              }
              keyboardShouldPersistTaps="handled"
              renderItem={({item}) => (
                <TouchableOpacity
                  className="flex-row items-center p-4 border-b border-gray-200 space-x-3"
                  onPress={() =>
                    navigation.navigate('Details', {id: item._id})
                  }>
                  <Image
                    source={{uri: `${ImageUri}/${item.images?.[0]}`}}
                    className="w-14 h-14 rounded-lg mr-3"
                    resizeMode="cover"
                  />
                  <Text className="text-base text-black flex-1">
                    {item.title}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Search;
