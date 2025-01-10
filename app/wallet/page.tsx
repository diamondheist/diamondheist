'use client';

import { useCallback,useEffect, useState } from 'react';
import DHTBalanceCard from '../components/DHTBalanceCard';
import TONBalanceCard from '../components/TONBalanceCard';
import { useTonConnectUI } from "@tonconnect/ui-react"
import { Address } from "@ton/core";
import { WalletIcon } from '@heroicons/react/24/solid';

export default function WalletPage() {
  const [balance, setBalance] = useState(0);
  const [tonConnectUI] = useTonConnectUI();
  const [tonWalletAddress, setTonWalletAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

   setBalance(100)
   
  const handleWalletConnection = useCallback((address: string)=> {
    setTonWalletAddress(address);
    console.log("Wallet Connected")
    setIsLoading(false)
  }, []);

const handleWalletDisconnection = useCallback(() => {
    setTonWalletAddress(null);
    console.log("wallet disconnected")
    setIsLoading(false)
  },[]);

  useEffect(() => {
    const checkWalletConnection = async () => {
      if(tonConnectUI.account?.address) {
        handleWalletConnection(tonConnectUI.account?.address);
      } else {
        handleWalletDisconnection();
      }
    };

    checkWalletConnection();

    const unsubscribe = tonConnectUI.onStatusChange((wallet) => {
      if (wallet) {
        handleWalletConnection(wallet.account?.address);
      } else {
        handleWalletDisconnection();
      }
    });

    return () => {
      unsubscribe();
    }

  },[tonConnectUI, handleWalletConnection, handleWalletDisconnection]);

  const handleWalletAction = async () => {
    if (tonConnectUI.connected) {
      setIsLoading(true);
      await tonConnectUI.disconnect();
    } else {
      await tonConnectUI.openModal();
    }
  }
  const formatAddress = (address: string) => {
    const tempAddress = Address.parse(address).toString();
    return `${tempAddress.slice(0, 4)}...${tempAddress.slice(-4)}`;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full rounded-xl backdrop-blur-sm bg-white/10 shadow-md py-2 px-2 mb-1">
        <div className="text-gray-700 font-bold py-2 px-4 rounded">
          Loading...
        </div>
      </div>
    );
  }

  return (
    <div className="text-center p-5 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-gray-400 mb-6">Wallet</h1>
      {/* Pass the balance to DHTBalanceCard */}
      <DHTBalanceCard balance={balance} imageSrc="/coin.png" />
      
      {/* You can implement the TONBalanceCard similarly as needed */}
      <TONBalanceCard balance={balance} imageSrc="/ton-coin.png" />

      {tonWalletAddress ? (
        <div className="flex flex-col items-center">
          <p className="mb-4">Wallet Address : {formatAddress(tonWalletAddress)}</p>
          <button 
           onClick={handleWalletAction} 
           className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition"><WalletIcon className="h-5 w-5" /> Disconnect Wallet</button>
        </div>
      ) : (
        <button 
        onClick={handleWalletAction}
         className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition"><WalletIcon className="h-5 w-5" /> Connect TON Wallet</button>
      )

      }

      <h1 className="text-3xl font-semibold text-gray-400 mt-6 mb-6">Transaction History</h1>
     
    </div>
  );
}
