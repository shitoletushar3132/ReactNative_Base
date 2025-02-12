const validateFormSignIn = formData => {
  const {email, password} = formData;

  if (!email.trim() || !password.trim()) {
    alert('Please fill in all fields.');
    return false;
  }

  if (!/\S+@\S+\.\S+/.test(email)) {
    alert('Please enter a valid email address.');
    return false;
  }

  if (password.length < 6) {
    alert('Password must be at least 6 characters long.');
    return false;
  }

  return true;
};

export default validateFormSignIn;
