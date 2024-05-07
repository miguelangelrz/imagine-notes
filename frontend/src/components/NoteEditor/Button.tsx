import { ButtonHTMLAttributes } from "react";
import { ButtonPriorityType } from "../../models/ButtonPriorityType.tsx";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  priority?: ButtonPriorityType;
  label: string;
};

function Button({
  priority = ButtonPriorityType.PRIMARY,
  label,
  ...rest
}: ButtonProps) {
  if (priority === ButtonPriorityType.SECONDARY) {
    return (
      <button
        className="px-5 py-2 bg-slate-200 text-slate-900 font-bold rounded"
        {...rest}
      >
        {label}
      </button>
    );
  }

  return (
    <button
      className="px-5 py-2 bg-amber-700 text-slate-50 font-bold rounded"
      {...rest}
    >
      {label}
    </button>
  );
}

export default Button;
