import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Platform,
  SafeAreaView,
  TextInput,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const Search = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState(['Shoes', 'Mobile', 'Laptop']);
  const [searchResults, setSearchResults] = useState([]);

  // Sample product data
  const allProducts = [
    { id: 1, name: 'iPhone 13' },
    { id: 2, name: 'Nike Running Shoes' },
    { id: 3, name: 'Dell Laptop' },
    { id: 4, name: 'Samsung Galaxy S22' },
  ];

  const handleSearch = (text) => {
    setQuery(text);
    if (text) {
      const filteredResults = allProducts.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
      setSearchResults(filteredResults);
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
            {/* Header with Back Arrow */}
            <View className="flex-row items-center mb-4">
              <TouchableOpacity onPress={() => navigation.goBack()} className="p-2">
                <Icon name="arrow-back" size={24} color="black" />
              </TouchableOpacity>
              <Text className="text-xl font-bold text-black ml-2">Search</Text>
            </View>

            {/* Search Bar */}
            <View className="flex-row items-center border border-gray-300 rounded-full p-2 bg-gray-100">
              <Icon name="search" size={24} color="gray" />
              <TextInput
                placeholder="Search for products, brands & more"
                placeholderTextColor="gray"
                className="flex-1 ml-2 text-black"
                value={query}
                onChangeText={handleSearch}
              />
            </View>

            {/* Recent Searches */}
            {query.length === 0 && (
              <View className="mt-4">
                <Text className="text-lg font-bold text-gray-700">Recent Searches</Text>
                {recentSearches.map((item, index) => (
                  <TouchableOpacity key={index} onPress={() => handleSearch(item)}>
                    <Text className="text-gray-500 mt-1">{item}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Search Results */}
            <FlatList
              data={searchResults}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity className="p-3 border-b border-gray-200">
                  <Text className="text-black">{item.name}</Text>
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
