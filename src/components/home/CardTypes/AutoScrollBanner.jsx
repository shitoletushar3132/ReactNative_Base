import React, {useEffect, useRef} from 'react';
import {Animated, Dimensions, ScrollView} from 'react-native';
import HorizontalCard from '../HorizontalCard';

const AutoScrollBanner = ({banners}) => {
  const scrollViewRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const {width, height} = Dimensions.get('window'); // Get screen dimensions

  useEffect(() => {
    const interval = setInterval(() => {
      // Calculate the current scroll position
      const currentPosition = scrollX._value;
      const bannerWidth = width; // Adjust based on your card width
      const nextPosition = currentPosition + bannerWidth;

      // Check if we've reached the last banner and reset to the first one
      if (nextPosition >= bannerWidth * banners.length) {
        scrollX.setValue(0); // Reset to the first banner
      } else {
        scrollX.setValue(nextPosition); // Scroll to the next banner
      }

      // Scroll smoothly to the next position
      scrollViewRef.current?.scrollTo({
        x: scrollX._value,
        animated: true,
      });
    }, 3000); // 3 seconds interval for auto-scrolling

    return () => clearInterval(interval);
  }, [scrollX, banners.length]);

  return (
    <Animated.ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      style={{flex: 1}}
      ref={scrollViewRef}
      contentContainerStyle={{flexDirection: 'row'}}
      onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {
        useNativeDriver: false,
      })}>
      {banners.map((banner, index) => (
        <HorizontalCard product={banner} key={index} />
      ))}
    </Animated.ScrollView>
  );
};

export default AutoScrollBanner;
