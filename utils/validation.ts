export const validateEmail = (email: string): boolean => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

export const areFieldsFilled = (fields: { [key: string]: string }): boolean => {
  for (let field in fields) {
    console.log("field: ", fields[field])
    if (!fields[field]) return false;
  }
  return true;
};

export const validatePasswordsMatch = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword;
};
