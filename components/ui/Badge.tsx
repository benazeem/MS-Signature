export function Badge({
  children,
  variant = "gold",
}: {
  children: React.ReactNode;
  variant?: "gold" | "muted";
}) {
  const variants = {
    gold: "bg-gold/10 text-gold border-gold/20",
    muted: "bg-border/50 text-text-muted border-border",
  };

  return (
    <span
      className={`inline-flex items-center text-[10px] tracking-widest uppercase px-3 py-1 border ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
