export default function MockupBLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div data-mockup="b" className="b-root">
      {children}
    </div>
  );
}
