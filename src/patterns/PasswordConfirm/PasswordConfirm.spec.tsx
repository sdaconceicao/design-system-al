import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import PasswordConfirm, { PasswordConfirmProps } from "./index";

describe("ChangePassword", () => {
  const setup = (props: Partial<PasswordConfirmProps> = {}) => {
    const utils = render(<PasswordConfirm {...props} />);
    const passwordInput = screen.getByLabelText("Password");
    const confirmPasswordInput = screen.getByLabelText("Confirm Password");
    const submitButton = screen.getByRole("button", { name: /submit/i });
    return {
      ...utils,
      passwordInput,
      confirmPasswordInput,
      submitButton,
    };
  };

  it("should render the form and its elements", () => {
    const { passwordInput, confirmPasswordInput, submitButton } = setup();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("should display error messages when passwords do not match", () => {
    const { passwordInput, confirmPasswordInput, submitButton } = setup();
    fireEvent.change(passwordInput, { target: { value: "Password1!" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "Password2!" } });
    fireEvent.click(submitButton);
    expect(screen.getByText(/passwords do not match/i)).toBeInTheDocument();
  });

  it("should display error messages when passwords do not meet criteria", () => {
    const { passwordInput, confirmPasswordInput, submitButton } = setup();
    fireEvent.change(passwordInput, { target: { value: "pass" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "pass" } });
    fireEvent.click(submitButton);
    expect(
      screen.getByText(/password must be at least 6 characters long/i)
    ).toBeInTheDocument();
  });

  it("should display success message when passwords are valid and match", () => {
    const { passwordInput, confirmPasswordInput, submitButton } = setup();
    fireEvent.change(passwordInput, { target: { value: "Password1!" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "Password1!" } });
    fireEvent.click(submitButton);
    expect(
      screen.getByText(/password changed successfully/i)
    ).toBeInTheDocument();
  });

  it("should call onSuccess when form is submitted successfully", () => {
    const onSuccess = jest.fn();
    const { passwordInput, confirmPasswordInput, submitButton } = setup({
      onSuccess,
    });
    fireEvent.change(passwordInput, { target: { value: "Password1!" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "Password1!" } });
    fireEvent.click(submitButton);
    expect(onSuccess).toHaveBeenCalledWith({ password: "Password1!" });
  });
});
