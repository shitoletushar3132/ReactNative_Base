import {
  View,
  Text,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  ScrollView,
  Image,
} from 'react-native';
import React, {useEffect} from 'react';
import {useRoute} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Products from '../../utils/data/home.json';
import Feather from 'react-native-vector-icons/Feather';

const DetailProduct = () => {
  const route = useRoute();
  const {id} = route.params;

  useEffect(() => {
    if (id == undefined) {
      navigation.goBack();
    }
  }, [id]);

  const {name, discount, description, color, price, discountPrice, imageUri} =
    Products.find(product => product.id === id);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1">
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            keyboardShouldPersistTaps="handled">
            {/* <MainHeader /> */}

            <View className="px-5 py-5">
              {/* image */}
              <View>
                <View>
                  <Image
                    source={require('../../assets/Home/Products/box.png')}
                  />
                  <View>
                    <Feather name="heart" />
                    <Feather name="share-2" />
                  </View>
                </View>

                <View>
                  <Text>{name}</Text>
                  <View>
                    <Text>Product Details</Text>
                    <Text>{description}</Text>
                  </View>
                </View>
              </View>
              {/* Detals */}
              <View></View>
              {/* Buttons */}
              <View></View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default DetailProduct;
