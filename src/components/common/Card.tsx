import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Card({ children, className = "", onClick }: CardProps) {
  const Component = onClick ? "button" : "div";

  return (
    <Component
      onClick={onClick}
      className={`glass-panel-soft rounded-3xl p-5 text-left text-white ${onClick ? "cursor-pointer transition-transform hover:scale-[1.01] hover:border-white/40" : ""} ${className}`}
    >
      {children}
    </Component>
  );
}
