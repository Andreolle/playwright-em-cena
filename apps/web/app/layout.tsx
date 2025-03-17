import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ozzy's Heaven 🧦",
  description: "A lojinha de mentirinha do Ozzy",
  icons: {
    icon: "/loading.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body style={{
        margin: 0,
        padding: 0,
        width: '100vw',
        height: '100vh'
      }}>
        {children}
      </body>
    </html>
  );
}
