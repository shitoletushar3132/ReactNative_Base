import {
  View,
  Text,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import VideoCard from '../../components/home/CardTypes/VideoCard';
import {getVideos} from '../../requests/products/getProducts';

const Blog = () => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await getVideos();
        console.log(data);
        setVideos(data.data.data);
      } catch (error) {
        console.error('Error fetching Videos:', error);
      }
    };

    fetchVideos(); // Call the async function
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, minHeight: 100}}
          keyboardShouldPersistTaps="handled">
          <View>
            <View className="py-4 px-5">
              <Text className="text-lg text-center font-bold">
                OUR VALUABLE CUSTOMER
              </Text>

              <View className="items-center">
                {videos.map(video => (
                  <VideoCard video={video} key={video._id} />
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Blog;
