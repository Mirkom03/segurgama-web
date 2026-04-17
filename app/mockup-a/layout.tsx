export default function MockupALayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div data-mockup="a" className="a-root">
      {children}
    </div>
  );
}
