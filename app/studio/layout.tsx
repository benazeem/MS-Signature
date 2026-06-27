export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      id="sanity-studio-root"
      style={{
        height: "100vh",
        width: "100vw",
        overflow: "auto",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
        background: "#fff",
      }}
    >
      {children}
    </div>
  );
}
