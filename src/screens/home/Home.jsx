import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  Platform,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import CategroyList from '../../utils/data/category.json';
import Products from '../../utils/data/home.json';
import CategoryBadge from '../../components/home/CategoryBadge';
import SectionTitle from '../../components/home/SectionTitle';
import HorizontalScrollView from '../../components/home/HorizontalScrollView';
import ProductList from '../../components/home/ProductList';
import MainHeader from '../../components/home/Header/MainHeader';

const Home = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1">
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            keyboardShouldPersistTaps="handled">
            {/* Header Section */}

            <MainHeader />

            {/* Main Content Section */}
            <View className="py-4">
              {/* Horizontal Products */}
              <HorizontalScrollView>
                <ProductList products={Products} layout="horizontal" />
              </HorizontalScrollView>

              {/* Category Badges */}
              <View className="my-7">
                <HorizontalScrollView>
                  {CategroyList.map(category => (
                    <CategoryBadge
                      key={category.id}
                      category={category.categoryName}
                    />
                  ))}
                </HorizontalScrollView>
              </View>

              {/* Top Products */}
              <View className="py-4 px-5">
                <SectionTitle
                  title="Our All Products"
                  onPressSeeAll={() => console.log('See all top products')}
                />
                <ProductList products={Products} layout="vertical" />
              </View>

              {/* Second Horizontal Products */}
              <View className="py-4 ">
                <View className="px-5">
                  <SectionTitle
                    title="Top Products"
                    onPressSeeAll={() => console.log('See all top products')}
                  />
                </View>

                <View className="mt-4">
                  <HorizontalScrollView>
                    <ProductList
                      products={Products}
                      layout="horizontalSecond"
                    />
                  </HorizontalScrollView>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Home;
