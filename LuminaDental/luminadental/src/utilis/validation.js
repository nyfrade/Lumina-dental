
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const validatePhone = (phone) => {
  const re = /^\d{3}-\d{3}-\d{4}$/;
  return re.test(String(phone));
};
