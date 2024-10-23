import { StoryObj } from "@storybook/react";
import Input, { InputProps } from "./index";

export default {
  title: "Components/Input",
  component: Input,
  args: {
    label: "First Name",
    id: "first-name",
  },
};

export const Default: StoryObj<InputProps> = {
  render: (args) => <Input {...args} />,
};
