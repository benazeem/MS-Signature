import Link from "next/link";
import { cn } from "@/lib/utils";
import { ButtonProps } from "@/types/components.types";

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  size = "md",
  className,
  id,
  type = "button",
  disabled = false,
}: ButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center font-body tracking-wider uppercase transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-gold text-primary hover:bg-soft-gold font-semibold",
    secondary: "bg-white/10 text-text-light hover:bg-white/20",
    outline: "border border-gold text-gold hover:bg-gold hover:text-primary",
    ghost: "text-text-muted hover:text-gold",
    gold: "bg-gold text-primary hover:bg-soft-gold font-semibold",
  };

  const sizes = {
    sm: "text-xs px-5 py-2.5",
    md: "text-xs px-8 py-3.5",
    lg: "text-sm px-10 py-4",
  };

  const classes = cn(baseClasses, variants[variant], sizes[size], className);

  if (href) {
    return (
      <Link href={href} className={classes} id={id}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={classes}
      id={id}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
