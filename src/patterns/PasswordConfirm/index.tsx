import { FC, useState, FormEvent, useCallback } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Message from "../../components/Message";
import usePasswordValidation from "./useValidation";

export interface PasswordConfirmProps {
  onSuccess?: ({ password }: { password: string }) => void;
}

const PasswordConfirm: FC<PasswordConfirmProps> = ({ onSuccess }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { validatePassword, errorMessages, valid, match } =
    usePasswordValidation(password, confirmPassword);

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const isValid = validatePassword();
      if (isValid) {
        onSuccess?.({ password });
      }
    },
    [validatePassword, onSuccess, password]
  );

  return (
    <form onSubmit={handleSubmit}>
      {errorMessages.length > 0 && (
        <Message type="error">
          {
            <ul>
              {errorMessages.map((error) => (
                <li key={error.replace(/ /g, "")}>{error}</li>
              ))}
            </ul>
          }
        </Message>
      )}
      {valid && <Message type="success">Password changed successfully</Message>}
      <Input
        id="password"
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        errorMessage={
          errorMessages.length > 0
            ? "Password does not match requirements."
            : ""
        }
        required
      />
      <Input
        id="confirmPassword"
        type="password"
        label="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        errorMessage={!match ? "Passwords do not match." : ""}
        required
      />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default PasswordConfirm;
