import {View, Text, TextInput, TouchableOpacity, Modal} from 'react-native';
import React, {useState} from 'react';
import {Rating} from 'react-native-ratings';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {addReview} from '../../../requests/products/getProducts';

const AddReview = ({
  visible,
  onClose,
  id,
  setSnackbarVisible,
  setSnackMessage,
}) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleSaveReview = async () => {
    try {
      if (review !== '' && rating > 0) {
        await addReview({id, comment: review, rating});
        // onSave(rating, review); // Call onSave after API call
        setSnackbarVisible(true);
        setSnackMessage('Review Added Successfully');
        onClose(); // Close modal
      }
    } catch (error) {
      console.error('Error saving review:', error);
    }
  };

  return (
    <Modal transparent visible={visible} animationType="fade">
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        <View
          style={{
            backgroundColor: 'white',
            width: 300,
            padding: 20,
            borderRadius: 10,
            shadowColor: '#000',
            shadowOpacity: 0.2,
            shadowRadius: 5,
            elevation: 5,
          }}>
          {/* Header */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 10,
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>
              Give A Review
            </Text>
            <TouchableOpacity onPress={() => onClose(false)}>
              <AntDesign name="close" size={20} color="black" />
            </TouchableOpacity>
          </View>

          {/* Rating */}
          <Text style={{textAlign: 'center', color: '#555', marginBottom: 5}}>
            Please rate us
          </Text>
          <Rating
            type="star"
            ratingCount={5}
            imageSize={30}
            showRating={false}
            startingValue={rating}
            onFinishRating={setRating}
          />

          {/* Review Input */}
          <Text style={{color: '#333', marginTop: 10}}>Review</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              borderRadius: 5,
              padding: 8,
              marginTop: 5,
              height: 80,
              textAlignVertical: 'top',
            }}
            multiline
            value={review}
            onChangeText={setReview}
            placeholder="Write your review here..."
          />

          {/* Save Button */}
          <TouchableOpacity
            style={{
              marginTop: 15,
              backgroundColor: 'orange',
              paddingVertical: 10,
              borderRadius: 5,
            }}
            onPress={handleSaveReview} // Call API function
          >
            <Text
              style={{textAlign: 'center', color: 'white', fontWeight: 'bold'}}>
              SAVE
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AddReview;
