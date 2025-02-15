// useAddressForm.js
import {useState} from 'react';
import validateAddressForm from '../../utils/Validation/address/addAddress';

export const useAddressForm = () => {
  const [formData, setFormData] = useState({
    streetAddress1: '',
    streetAddress2: '',
    city: '',
    pincode: '',
    state: '',
    phone: '',
    fullName: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData({...formData, [field]: value});
    setErrors({...errors, [field]: ''});
  };

  const validateForm = () => {
    const validationErrors = validateAddressForm(formData);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  return {
    formData,
    errors,
    handleInputChange,
    validateForm,
  };
};
