import Footer from "@/components/share/Footer";
import Navbar from "@/components/share/Navbar";
import Providers from "@/providers/Providers";
import { Toaster } from "sonner";
import "../globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Toaster richColors position="top-center" />
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
