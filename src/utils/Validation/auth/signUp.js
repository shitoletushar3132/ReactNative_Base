const validateSignUpForm = (formData, setSnackMessage) => {
  const {name, email, phone, password} = formData;

  if (!name.trim() || !email.trim() || !phone.trim() || !password.trim()) {
    setSnackMessage('Please fill in all fields.');
    return false;
  }

  if (!/^[a-zA-Z\s]+$/.test(name)) {
    setSnackMessage('Name must contain only letters and spaces.');
    return false;
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    setSnackMessage('Please enter a valid email address.');
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

export default validateSignUpForm;
