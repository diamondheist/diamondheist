
import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import { Inter } from "next/font/google"
import ClientNav from './components/ClientNav';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Diamond Heist",
  description: "Mine to the future",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
       <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
      </head>
      <body className={`${inter.className} antialiased min-h-screen bg-cover bg-center bg-no-repeat`} style={{ backgroundImage: "url('/background.png')" }}>
      <div className="flex flex-col min-h-screen">
          {/* Main content */}
          <div className="flex-grow overflow-y-auto pb-20"> {/* Ensure content can scroll */}
            {children}
          </div>
          {/* Fixed Navbar */}
          <ClientNav />
        </div>
      </body>
    </html> 
  );
}
