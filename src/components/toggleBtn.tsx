'use client'

type Size = "sm" | "md" | "lg";

type Props = {
  checked: boolean;
  onChange: (value: boolean) => void;
  size?: Size;
  disabled?: boolean;
};

const sizeStyles = {
  sm: {
    track: "w-10 h-5",
    knob: "w-4 h-4",
    translate: "translate-x-5",
  },
  md: {
    track: "w-14 h-7",
    knob: "w-6 h-6",
    translate: "translate-x-7",
  },
  lg: {
    track: "w-18 h-9",
    knob: "w-8 h-8",
    translate: "translate-x-9",
  },
};

export default function ToggleButton({
  checked,
  onChange,
  size = "md",
  disabled = false,
}: Props) {

  const sizes = sizeStyles[size];

  return (
    <button
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`
        relative inline-flex items-center rounded-full
        transition-colors duration-300 ease-in-out
        focus:outline-none  focus:ring-offset-2 focus:ring-slate-500
        ${sizes.track}
        ${checked ? "bg-slate-900" : "bg-gray-300"}
        ${disabled ? "opacity-50 cursor-not-allowed" : ""}
      `}
    >
      <span
        className={`
          bg-white rounded-full shadow-md
          transform transition-transform duration-300 ease-in-out
          ${sizes.knob}
          ${checked ? sizes.translate : "translate-x-0"}
        `}
      />
    </button>
  );
}