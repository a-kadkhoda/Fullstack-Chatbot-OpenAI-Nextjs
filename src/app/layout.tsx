import "./globals.css";
import { Providers } from "./providers";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="size-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
