import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Message, { MessageProps } from "./index";

describe("Message", () => {
  const setup = (props: Partial<MessageProps> = {}) => {
    const utils = render(<Message {...props}>Test Message</Message>);
    const message = screen.getByText("Test Message");
    return {
      ...utils,
      message,
    };
  };

  it("should render the Message with default props", () => {
    const { message } = setup();
    expect(message).toBeInTheDocument();
    expect(message).toHaveClass("messages default");
  });

  it("should render the Message with the error type", () => {
    const { message } = setup({ type: "error" });
    expect(message).toHaveClass("messages error");
  });

  it("should render the Message with the success type", () => {
    const { message } = setup({ type: "success" });
    expect(message).toHaveClass("messages success");
  });

  it("should render the Message with children", () => {
    const { message } = setup();
    expect(message).toHaveTextContent("Test Message");
  });
});
