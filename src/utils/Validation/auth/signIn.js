const validateFormSignIn = (formData, setSnackMessage) => {
  const {phone, password} = formData;

  if (!phone.trim() || !password.trim()) {
    setSnackMessage('Please fill in all fields.');
    return false;
  }
  if (!/^\d{10}$/.test(phone)) {
    setSnackMessage('Phone number must be exactly 10 digits.');
    return false;
  }

  if (password.length < 6) {
    setSnackMessage('Password must be at least 6 characters long.');
    return false;
  }

  return true;
};

export default validateFormSignIn;
