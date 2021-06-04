export const validateEmail = (email) => {
  const emailReqex =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return email.match(emailReqex);
};

export const validateSignUpData = (
  email,
  username,
  password,
  confirmPassword
) => {
  if (!email || !username || !password || !confirmPassword) return false;
  if (password != confirmPassword) return false;
  return true;
};
