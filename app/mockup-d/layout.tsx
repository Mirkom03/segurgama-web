export default function MockupDLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div data-mockup="d" className="d-root">
      {children}
    </div>
  );
}
