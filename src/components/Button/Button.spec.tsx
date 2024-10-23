import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Button, { ButtonProps } from "./index";

describe("Button", () => {
  const setup = (props: Partial<ButtonProps> = {}) => {
    const utils = render(
      <Button type="button" {...props}>
        Click me
      </Button>
    );
    const button = screen.getByRole("button");
    return {
      ...utils,
      button,
    };
  };

  it("should render the button with default props", () => {
    const { button } = setup();
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("button primary");
    expect(button).toHaveAttribute("type", "button");
    expect(button).not.toBeDisabled();
  });

  it("should render the button with the primary variant", () => {
    const { button } = setup({ variant: "primary" });
    expect(button).toHaveClass("button primary");
  });

  it("should render the button with the secondary variant", () => {
    const { button } = setup({ variant: "secondary" });
    expect(button).toHaveClass("button secondary");
  });

  it("should handle the onClick event", () => {
    const onClick = jest.fn();
    const { button } = setup({ onClick });
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("should render the button in a disabled state", () => {
    const onClick = jest.fn();
    const { button } = setup({ disabled: true, onClick });
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });
});
