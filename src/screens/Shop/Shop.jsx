import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {AppContext} from '../../contextProvider/AppContext';
import {useNavigation} from '@react-navigation/native';
import {getAllProducts} from '../../requests/products/getProducts';
import CategoryCard from '../../components/home/CardTypes/CategoryCard';
import VerticalCard from '../../components/home/VerticalCard';

const Shop = () => {
  const {categories} = useContext(AppContext);
  const navigation = useNavigation();

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchProducts = async page => {
    if (loadingMore) return;
    setLoadingMore(true);

    try {
      const data = await getAllProducts(page, 10);
      setProducts(prev =>
        page === 1 ? data.data.data.data : [...prev, ...data.data.data.data],
      );
      setTotalPages(data.data.data.totalPages);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchProducts(1);
  }, []);

  const loadMoreProducts = () => {
    if (!loadingMore && currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchProducts(nextPage);
    }
  };

  return (
    <View className="flex-1 bg-white px-3">
      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#ff8000" />
        </View>
      ) : (
        <FlatList
          ListHeaderComponent={
            <>
              <View>
                <FlatList
                  data={categories}
                  horizontal
                  keyExtractor={item => item._id}
                  renderItem={({item}) => <CategoryCard category={item} />}
                  showsHorizontalScrollIndicator={false}
                />
                <TouchableOpacity
                  className="items-end"
                  onPress={() => navigation.navigate('Category')}>
                  <Text className="text-[#ff8000] underline">See All</Text>
                </TouchableOpacity>
                <Text className="text-[#ff8000] font-bold text-xl text-center mt-7 mb-5">
                  OUR ALL PRODUCTS
                </Text>
              </View>
            </>
          }
          data={products}
          keyExtractor={item => item._id}
          renderItem={({item}) => <VerticalCard product={item} />}
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          onEndReached={loadMoreProducts}
          onEndReachedThreshold={0.2}
          ListFooterComponent={
            loadingMore && <ActivityIndicator size="large" color="#ff8000" />
          }
        />
      )}
    </View>
  );
};

export default Shop;
