const validateEditForm = (formData, setSnackMessage) => {
  const {fullName, email, phone, country, gender} = formData;

  if (
    !fullName.trim() ||
    !email.trim() ||
    !phone.trim() ||
    !gender.trim() ||
    !country.trim()
  ) {
    setSnackMessage('Please fill in all fields.');
    return false;
  }

  if (!/^[a-zA-Z\s]+$/.test(fullName)) {
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

  const validGenders = ['Male', 'Female', 'Other'];
  if (!validGenders.includes(gender)) {
    setSnackMessage('Please select a valid gender: Male, Female, or Other.');
    return false;
  }
  return true;
};

export default validateEditForm;
