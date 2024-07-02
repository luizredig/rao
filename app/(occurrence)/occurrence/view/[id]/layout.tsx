import Menu from "@/app/components/menu";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="flex h-screen flex-row">
        <Menu />
        {children}
      </div>
    </>
  );
}
