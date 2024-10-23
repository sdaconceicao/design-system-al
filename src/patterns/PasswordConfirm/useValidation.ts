import { useState } from "react";

const useValidation = (password: string, confirmPassword: string) => {
  const [errorMessages, setErrorMessages] = useState<string[]>([]);
  const [valid, setValid] = useState(false);
  const [match, setMatch] = useState(true);

  const validatePassword = () => {
    const errors = [];
    const didMatch = password === confirmPassword;

    // Minimum length
    if (password.length < 6) {
      errors.push("Password must be at least 6 characters long.");
    }

    // Uppercase character
    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter.");
    }

    // Lowercase character
    if (!/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter.");
    }

    // Numeric character
    if (!/[0-9]/.test(password)) {
      errors.push("Password must contain at least one number.");
    }

    // Special character
    if (!/[!@#$%^&*()_\-+={[}\]|:;"'<,>.]/.test(password)) {
      errors.push("Password must contain at least one special character.");
    }

    setMatch(didMatch);
    setErrorMessages(errors);
    if (errors.length > 0 || !didMatch) {
      setValid(false);
      return false;
    }
    setValid(true);
    return true;
  };

  return { validatePassword, errorMessages, valid, match };
};

export default useValidation;
