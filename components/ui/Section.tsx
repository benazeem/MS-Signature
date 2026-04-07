export function Section({
  children,
  className = "",
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section className={`py-20 md:py-28 ${className}`} id={id}>
      <div className="container-wide">{children}</div>
    </section>
  );
}

export function SectionHeader({
  label,
  title,
  subtitle,
}: {
  label?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="text-center mb-16">
      {label && (
        <span className="text-gold text-xs tracking-[0.3em] uppercase block mb-4">
          {label}
        </span>
      )}
      <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-text-light mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-text-muted text-sm md:text-base max-w-lg mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className="gold-separator max-w-[80px] mx-auto mt-6" />
    </div>
  );
}
