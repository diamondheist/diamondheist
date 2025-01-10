// app/components/ClientWrapper.tsx
'use client';

import Script from "next/script";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import ClientNav from './ClientNav';

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
      <TonConnectUIProvider manifestUrl="https://moccasin-implicit-eel-888.mypinata.cloud/ipfs/bafkreihobpr5ig4v5sy36ader3q5eos6v3lwz35k2hjph3ams6o2lqr4li">
        <div className="flex flex-col min-h-screen">
          {/* Main content */}
          <div className="flex-grow overflow-y-auto pb-20">
            {children}
          </div>
          {/* Fixed Navbar */}
          <ClientNav />
        </div>
      </TonConnectUIProvider>
    </>
  );
}