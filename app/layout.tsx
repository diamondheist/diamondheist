'use client'

import "./globals.css";
import Script from "next/script";
import { Inter } from "next/font/google"
import ClientNav from './components/ClientNav';
import { TonConnectUIProvider } from "@tonconnect/ui-react";

const inter = Inter({ subsets: ['latin'] })



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
        <TonConnectUIProvider manifestUrl="https://moccasin-implicit-eel-888.mypinata.cloud/ipfs/bafkreihobpr5ig4v5sy36ader3q5eos6v3lwz35k2hjph3ams6o2lqr4li">
          <div className="flex flex-col min-h-screen">
              {/* Main content */}
              <div className="flex-grow overflow-y-auto pb-20"> {/* Ensure content can scroll */}
                {children}
              </div>
              {/* Fixed Navbar */}
              <ClientNav />
            </div>
        </TonConnectUIProvider>
      </body>
    </html> 
  );
}
