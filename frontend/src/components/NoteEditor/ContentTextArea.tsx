import { ChangeEventHandler } from "react";

type ContentTextAreaProps = {
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
};

function ContentTextArea({ value, onChange }: ContentTextAreaProps) {
  return (
    <textarea
      placeholder="Take a note..."
      className="h-80 p-3 focus:ring-0 focus:outline-none focus:border-amber-800 border-2 border-transparent rounded"
      onChange={onChange}
      value={value}
    />
  );
}

export default ContentTextArea;
