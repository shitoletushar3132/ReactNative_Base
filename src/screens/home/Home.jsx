import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Platform,
  SafeAreaView,
  Text,
} from 'react-native';
import CategoryBadge from '../../components/home/CategoryBadge';
import SectionTitle from '../../components/home/SectionTitle';
import HorizontalScrollView from '../../components/home/HorizontalScrollView';
import ProductList from '../../components/home/ProductList';
import MainHeader from '../../components/home/Header/MainHeader';
import {AppContext} from '../../contextProvider/AppContext';
import {getUserData} from '../../requests/auth/authRequest';
import {
  getAllBanners,
  getAllCategory,
  getAllProducts,
  getProductDetails,
  getVideos,
} from '../../requests/products/getProducts';
import {ActivityIndicator} from 'react-native-paper';
import AutoScrollBanner from '../../components/home/CardTypes/AutoScrollBanner';
import {useNavigation} from '@react-navigation/native';
import Header from '../../components/home/Homepage/Header';
import SearchBar from '../../components/home/SearchBar';

const Home = () => {
  const {
    setUser,
    refreshData,
    categories,
    setCategories,
    banners,
    setBanners,
    products,
    setProducts,
    videos,
    setVideos,
  } = useContext(AppContext);

  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProducts(); // Assuming this API fetches products
      setProducts(data.data.data.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
      // Stop loading once data is fetched
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getAllCategory();
      setCategories(data.data.data.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchBanners = async () => {
    try {
      const data = await getAllBanners();
      setBanners(data.data.data);
    } catch (error) {
      console.error('Error fetching Banners:', error);
    }
  };

  const fetchVideos = async () => {
    try {
      const data = await getVideos();
      setVideos(data.data.data);
    } catch (error) {
      console.error('Error fetching Videos:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
    fetchProducts();
    fetchBanners();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const res = await getUserData();
      setUser(res.data.data);
    };
    fetchUserData();
  }, [refreshData]);

  console.log(banners);
  console.log(categories);
  console.log(products);
  console.log(videos);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, minHeight: 100}}
          keyboardShouldPersistTaps="handled">
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1">
            {/* Header Section */}
            <View style={{position: 'sticky', top: 0, zIndex: 100}}>
              {/* <MainHeader /> */}
              <Header />
            </View>

            {/* Main Content Section */}

            {loading ? (
              <View className="flex-1 justify-center items-center">
                <ActivityIndicator
                  animating={true}
                  size="medium"
                  color={'#DD5411'}
                />
              </View>
            ) : (
              <>
                <AutoScrollBanner banners={banners} />
                <SearchBar />

                <View className="">
                  {/* <HorizontalScrollView>
                  <ProductList products={banners} layout="horizontal" />
                </HorizontalScrollView> */}

                  {/* Category Badges */}
                  <View className="my-5">
                    <HorizontalScrollView>
                      {categories?.map(category => (
                        <CategoryBadge
                          key={category._id}
                          category={category.name}
                        />
                      ))}
                    </HorizontalScrollView>
                  </View>

                  {/* Top Products */}
                  <View className="py-4 px-5 ">
                    <View className="mb-5">
                      <SectionTitle
                        title="Our Top Products"
                        onPressSeeAll={() => navigation.navigate('Shop')}
                      />
                    </View>

                    <ProductList
                      products={products?.filter(product =>
                        product.keyward.includes('Top Product'),
                      )}
                      layout="vertical"
                    />
                  </View>

                  {/* Second Horizontal Products */}
                  <View className=" px-5">
                    <View className="my-4">
                      <SectionTitle
                        title="OUR VALUABLE PRODUCTS"
                        onPressSeeAll={() => navigation.navigate('Shop')}
                      />
                    </View>

                    <View className="mt-3">
                      <HorizontalScrollView>
                        <ProductList
                          products={products.filter(product =>
                            product.keyward.includes('Valuable Product'),
                          )}
                          // products={Pro}
                          layout="horizontalSecond"
                        />
                      </HorizontalScrollView>

                      {/* <ProductList
                        products={products.filter(product =>
                          product.keyward.includes('Valuable Product'),
                        )}
                        layout="vertical"
                      /> */}
                    </View>
                  </View>
                </View>
              </>
            )}
          </KeyboardAvoidingView>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Home;
