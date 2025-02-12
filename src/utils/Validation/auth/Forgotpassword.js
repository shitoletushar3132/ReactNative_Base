const validatePasswordForm = formData => {
  const {phone, newPassword} = formData;

  if (!phone.trim() || !newPassword.trim()) {
    alert('Please fill in all fields.');
    return false;
  }

  if (!/^\d{10}$/.test(phone)) {
    alert('Phone number must be exactly 10 digits.');
    return false;
  }

  if (newPassword.length < 6) {
    alert('Password must be at least 6 characters long.');
    return false;
  }

  return true;
};

export default validatePasswordForm;
