'use client'; 
import { useEffect, useState } from 'react';

interface UserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  bio?: string;
  language_code: string;
  is_premium?: boolean;
}

declare global {
  interface Window {
    Telegram?: {
      WebApp: any;
    };
  }
}

const Profile = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
      // Check if we're in a Telegram WebApp environment
      if (window.Telegram?.WebApp) {
        const webAppData = window.Telegram.WebApp.initDataUnsafe;
        if (webAppData.user) {
          setUserData(webAppData.user as UserData);
        } 
  }
}, []);

  return (
    <>
      {
        !userData ? (
        <div className="flex justify-center items-center min-h-screen" >
          <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"> loading</div>
        </div>
        ) : (
            <div className="max-w-2xl mx-auto">
            <div className="backdrop-blur-lg bg-white/10 rounded-2xl overflow-hidden shadow-2xl transform transition-all hover:scale-[1.01]">
                {/* Profile Header */}
                <div className="relative h-48 bg-gradient-to-r from-blue-600 to-purple-600">
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.2),transparent)]"></div>
                </div>
                
                {/* Profile Image */}
                <div className="absolute -bottom-16 w-full flex justify-center">
                    <div className="relative group">
                    <div className="w-32 h-32 rounded-full border-4 border-white/30 backdrop-blur-xl bg-white/10 overflow-hidden shadow-xl transition-transform group-hover:scale-105">
                    </div>
                    {userData.is_premium && (
                        <div className="absolute -right-2 -top-2 bg-gradient-to-r from-yellow-400 to-yellow-600 p-2 rounded-full shadow-lg animate-pulse">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        </div>
                    )}
                    </div>
                </div>
                </div>

                {/* Profile Content */}
                <div className="pt-20 pb-8 px-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-white">
                    {userData.first_name} {userData.last_name}
                    </h1>
                    {userData.username && (
                    <p className="text-blue-200 mt-2 text-lg">@{userData.username}</p>
                    )}
                </div>

                {userData.bio && (
                    <div className="mt-8 p-6 backdrop-blur-md bg-white/5 rounded-xl">
                    <p className="text-blue-100 text-center leading-relaxed">{userData.bio}</p>
                    </div>
                )}

                <div className="mt-16 grid grid-cols-2 gap-4">
                    <div className="backdrop-blur-md bg-white/5 rounded-xl p-6 transition-all hover:bg-white/10">
                    <h3 className="text-blue-200 text-sm font-medium mb-2">Telegram ID</h3>
                    <p className="text-white text-lg font-semibold">{userData.id}</p>
                    </div>
                    <div className="backdrop-blur-md bg-white/5 rounded-xl p-6 transition-all hover:bg-white/10">
                    <h3 className="text-blue-200 text-sm font-medium mb-2">Joined</h3>
                    </div>
                </div>
                </div>
            </div>
            </div>
        )
      }
    </>
  );
};

export default Profile;