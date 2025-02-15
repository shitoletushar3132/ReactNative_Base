const validateAddressForm = (formData, setSnackMessage) => {
  const {fullName, phone, streetAddress1, city, pincode, state} = formData;

  if (
    !fullName.trim() ||
    !phone.trim() ||
    !streetAddress1.trim() ||
    !city.trim() ||
    !pincode.trim() ||
    !state.trim()
  ) {
    setSnackMessage('Please fill in all required fields.');
    return false;
  }

  console.log(formData);

  if (!/^[a-zA-Z\s]+$/.test(fullName)) {
    setSnackMessage('Full Name must contain only letters and spaces.');
    return false;
  }

  if (!/^\d{10}$/.test(phone)) {
    setSnackMessage('Phone number must be exactly 10 digits.');
    return false;
  }

  if (!/^[a-zA-Z\s]+$/.test(city)) {
    setSnackMessage('City name must contain only letters.');
    return false;
  }

  if (!/^[a-zA-Z\s]+$/.test(state)) {
    setSnackMessage('State name must contain only letters.');
    return false;
  }

  if (!/^\d{6}$/.test(pincode)) {
    setSnackMessage('Pincode must be exactly 6 digits.');
    return false;
  }

  return true;
};

export default validateAddressForm;
