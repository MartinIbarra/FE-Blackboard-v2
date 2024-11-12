import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import { ChatInput } from "../components/ChatForm/ChatInput";

const meta = {
  title: "Components/ChatInput",
  component: ChatInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    backgroundColor: { control: "color" },
    onChange: fn(),
  },
} satisfies Meta<typeof ChatInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultInput: Story = {
  args: {
    type: "text",
    value: "",
    onChange: () => {},
  },
};
