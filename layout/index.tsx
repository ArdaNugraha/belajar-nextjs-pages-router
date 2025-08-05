export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div>header</div>
      <div>{children}</div>
      <div>footer</div>
    </div>
  );
}
