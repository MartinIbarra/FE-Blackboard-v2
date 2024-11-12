import { ChangeEvent } from "react";

export interface ChatInputPropsType {
  /** value */
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type: string;
  backgroundColor?: string;
}

export const ChatInput = ({
  value,
  onChange,
  type,
  backgroundColor,
  ...args
}: ChatInputPropsType) => {
  return (
    <input
      value={value}
      type={type}
      className={`flex w-full text-black ${backgroundColor}`}
      onChange={onChange}
      {...args}
    />
  );
};
