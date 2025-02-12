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
} from 'react-native';
import React from 'react';
import SearchBar from '../../components/home/SearchBar';
import Header from '../../components/home/Header';
import Card from './VerticalCard';
import NavigateButton from '../NavigateButton';

const Search = ({navigation}) => {
  return (
    <SafeAreaView className="flex-1">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          className="flex-1">
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            keyboardShouldPersistTaps="handled">
            <View>
              <View>
                <NavigateButton
                  title={'back'}
                  navigation={navigation}
                  route="MainTabs"
                />
                <View className="border">
                  <TextInput
                    placeholder="Search Product"
                    placeholderTextColor={'black'}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Search;
