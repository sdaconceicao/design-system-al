import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Input, { InputProps } from "./index";

describe("Input", () => {
  const setup = (props: Partial<InputProps> = {}) => {
    const utils = render(<Input id="test" label="Label" {...props} />);
    const input = screen.getByLabelText(props.label || "Label");
    return {
      ...utils,
      input,
    };
  };

  it("should render the input with default props", () => {
    const { input } = setup({
      id: "test",
      label: "Label",
      value: "",
      onChange: jest.fn(),
    });
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("type", "text");
    expect(input).not.toBeRequired();
    expect(input).toHaveAttribute("aria-invalid", "false");
  });

  it("should render the input with a label", () => {
    setup({ id: "test", label: "Test Label", value: "", onChange: jest.fn() });
    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  it("should handle the onChange event", () => {
    const onChange = jest.fn();
    const { input } = setup({
      id: "test",
      label: "Label",
      value: "",
      onChange,
    });
    fireEvent.change(input, { target: { value: "new value" } });
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it("should render the input with an error message", () => {
    setup({
      id: "test",
      label: "Label",
      value: "",
      onChange: jest.fn(),
      errorMessage: "Error message",
    });
    expect(screen.getByText("Error message")).toBeInTheDocument();
    expect(screen.getByLabelText("Label")).toHaveAttribute(
      "aria-invalid",
      "true"
    );
  });

  it("should render the input with custom aria-describedby", () => {
    setup({
      id: "test",
      label: "Label",
      value: "",
      onChange: jest.fn(),
      ariaDescribedby: "custom-helper",
    });
    expect(screen.getByLabelText("Label")).toHaveAttribute(
      "aria-describedby",
      "custom-helper"
    );
  });
});
