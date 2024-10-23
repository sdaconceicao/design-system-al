import { StoryObj } from "@storybook/react";
import PasswordConfirm, { PasswordConfirmProps } from "./index";

export default {
  title: "Patterns/PasswordConfirm",
  component: PasswordConfirm,
};

export const Default: StoryObj<PasswordConfirmProps> = {
  render: (args) => <PasswordConfirm {...args} />,
};
