import type { Metadata } from "next";
import "./globals.css";
import { Poppins } from "next/font/google";
import { Toaster } from "sonner";
import { QueryClientProviderWrapper } from "@/providers/QueryClientProvider";

export const metadata: Metadata = {
  title: "SoundSync",
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "600", "800"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <QueryClientProviderWrapper>{children}</QueryClientProviderWrapper>
        <Toaster richColors expand visibleToasts={5} />
      </body>
    </html>
  );
}
