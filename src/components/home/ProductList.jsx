import React from 'react';
import {View} from 'react-native';
import HorizontalCard from './HorizontalCard';
import VerticalCard from '../../components/home/VerticalCard';
import HorizontalSecondCard from '../../components/home/HorizontalSecondCard';
import CategoryCard from './CardTypes/CategoryCard';

const ProductList = ({products, layout = 'vertical'}) => {
  const renderProduct = product => {
    switch (layout) {
      case 'horizontal':
        return <HorizontalCard key={product._id} product={product} />;
      case 'horizontalSecond':
        return <HorizontalSecondCard key={product._id} product={product} />;
      case 'horizontalCategory':
        return <CategoryCard key={product._id} product={product} />;
      default:
        return <VerticalCard key={product._id} product={product} />;
    }
  };

  return (
    <View className="flex-row flex-wrap justify-between">
      {products.map(product => renderProduct(product))}
    </View>
  );
};

export default ProductList;
