import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Label, { LabelProps } from "./index";

describe("Label", () => {
  const setup = (props: Partial<LabelProps> = {}) => {
    const utils = render(
      <Label htmlFor="test" {...props}>
        Test Label
      </Label>
    );
    const label = screen.getByText("Test Label");
    return {
      ...utils,
      label,
    };
  };

  it("should render the Label with default props", () => {
    const { label } = setup({ htmlFor: "test" });
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute("for", "test");
    expect(label).not.toContainHTML(
      '<span aria-hidden="true" class="required">*</span>'
    );
  });

  it("should render the Label with the required prop", () => {
    const { label } = setup({ htmlFor: "test", required: true });
    expect(label).toContainHTML(
      '<span aria-hidden="true" class="required">*</span>'
    );
  });

  it("should render the Label with children", () => {
    const { label } = setup({ htmlFor: "test" });
    expect(label).toHaveTextContent("Test Label");
  });
});
