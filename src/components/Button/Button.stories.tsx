import { StoryObj } from "@storybook/react";
import Button, { ButtonProps } from "./index";

export default {
  title: "Components/Button",
  component: Button,
  args: {
    children: "Click me",
  },
};

export const Primary: StoryObj<ButtonProps> = {
  render: (args) => <Button {...args} />,
};

export const Secondary: StoryObj<ButtonProps> = {
  render: (args) => <Button {...args} variant={"secondary"} />,
};
