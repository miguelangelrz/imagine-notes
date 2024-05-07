import { ChangeEventHandler } from "react";

type TitleInputProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
};

function TitleInput({ value, onChange }: TitleInputProps) {
  return (
    <input
      placeholder="Title"
      className="mb-1 p-3 focus:ring-0 focus:outline-none focus:border-amber-800 border-2 border-transparent rounded"
      type="text"
      onChange={onChange}
      value={value}
    />
  );
}

export default TitleInput;
