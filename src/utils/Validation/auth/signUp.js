const validateSignUpForm = formData => {
  const {name, email, phone, password} = formData;

  if (!name.trim() || !email.trim() || !phone.trim() || !password.trim()) {
    alert('Please fill in all fields.');
    return false;
  }

  if (!/^[a-zA-Z\s]+$/.test(name)) {
    alert('Name must contain only letters and spaces.');
    return false;
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    alert('Please enter a valid email address.');
    return false;
  }

  if (!/^\d{10}$/.test(phone)) {
    alert('Phone number must be exactly 10 digits.');
    return false;
  }

  if (password.length < 6) {
    alert('Password must be at least 6 characters long.');
    return false;
  }

  return true;
};

export default validateSignUpForm;
