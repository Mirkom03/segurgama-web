export default function MockupCLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div data-mockup="c" className="c-root">
      {children}
    </div>
  );
}
