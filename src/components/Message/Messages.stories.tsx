import { StoryObj } from "@storybook/react";
import Message, { MessageProps } from "./index";

export default {
  title: "Components/Message",
  component: Message,
  args: {
    children: "Here is a message",
  },
};

export const Default: StoryObj<MessageProps> = {
  render: (args) => <Message {...args} />,
};

export const Error: StoryObj<MessageProps> = {
  render: (args) => <Message {...args} type="error" />,
};

export const Success: StoryObj<MessageProps> = {
  render: (args) => <Message {...args} type="success" />,
};
