const useFormValidation = () => {
  const validateUsername = (username: string) => {
    if (username.length < 4) {
      return "Username must be at least 4 characters.";
    }
    const usernameRegex = /^[a-zA-Z0-9]{4,}$/;
    if (!usernameRegex.test(username)) {
      return "Username must be only letters and numbers.";
    }
    return "";
  };

  const validatePassword = (password: string) => {
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    return "";
  };

  const validateConfirmPassword = (
    password: string,
    confirmPassword: string
  ) => {
    if (password !== confirmPassword) {
      return "Password confirmation is different.";
    }
    return "";
  };

  return {
    validateUsername,
    validatePassword,
    validateConfirmPassword,
  };
};

export default useFormValidation;
