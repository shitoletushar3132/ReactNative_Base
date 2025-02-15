import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getAllCategory} from '../../requests/products/getProducts';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {ImageUri} from '../../utils/constant';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';
import {useNavigation} from '@react-navigation/native';

const PAGE_SIZE = 5; // Number of items per page

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const navigation = useNavigation();

  const fetchCategory = async page => {
    if (page > totalPages) return;
    if (page === 1) setLoading(true);
    else setLoadingMore(true);

    try {
      const data = await getAllCategory(page, PAGE_SIZE);
      setCategories(prev =>
        page === 1 ? data.data.data.data : [...prev, ...data.data.data.data],
      );
      setTotalPages(data.data.data.totalPages);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }

    setLoading(false);
    setLoadingMore(false);
  };

  useEffect(() => {
    fetchCategory(1);
  }, []);

  const loadMore = () => {
    if (loadingMore || currentPage >= totalPages) return;
    setCurrentPage(prev => prev + 1);
    fetchCategory(currentPage + 1);
  };

  const renderShimmer = () => (
    <View className="my-4 bg-white rounded-lg shadow-lg w-full justify-center items-center">
      <ShimmerPlaceHolder
        style={{width: '100%', height: 120, borderRadius: 10}}
      />
      <ShimmerPlaceHolder style={{width: '100%', height: 120, marginTop: 10}} />
    </View>
  );

  return (
    <View className="flex-1 bg-white py-5">
      <Text className="text-xl font-bold text-center text-[#ff8000] mb-3">
        OUR ALL PRODUCTS
      </Text>

      {loading ? (
        <FlatList
          data={[1, 2, 3, 4, 5]} // Placeholder data for shimmer
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderShimmer}
        />
      ) : (
        <FlatList
          data={categories}
          keyExtractor={item => item._id}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('CategoryFilter', {category: item.name})
              }
              className="mb-4 p-3 bg-white rounded-lg shadow-lg w-full justify-center items-center"
              style={{
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 0.2,
                shadowRadius: 4,
                elevation: 5,
              }}>
              <Image
                source={{uri: `${ImageUri}/${item.image}`}}
                style={{width: 200, height: 120, borderRadius: 10}}
              />
              <Text className="text-center mt-2 font-bold text-lg">
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={() =>
            loadingMore && <ActivityIndicator size="large" color="#ff8000" />
          }
        />
      )}
    </View>
  );
};

export default Category;
