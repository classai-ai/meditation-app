import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border-2 border-accent-green bg-accent-green text-primary-dark hover:bg-[#a0e0bc] shadow-lg shadow-black/30",
  secondary:
    "border-2 border-white/35 bg-card-strong text-white hover:border-white/55 hover:bg-[rgba(12,24,42,0.62)] shadow-md",
  ghost:
    "border-2 border-transparent bg-black/35 text-white hover:border-white/25 hover:bg-black/50",
};

export function Button({
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-all disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
