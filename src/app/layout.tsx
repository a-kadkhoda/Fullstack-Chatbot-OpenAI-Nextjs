import "./globals.css";
import { Providers } from "./providers";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="h-screen">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
