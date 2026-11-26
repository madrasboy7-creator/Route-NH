'use client';

import React, { useEffect, useState } from 'react';
import RouteNHSplashScreen from './RouteNHSplashScreen';

export default function AppSplashProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showSplash, setShowSplash] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
    try {
      // If running inside Android Native container, Jetpack Compose already displayed the native splash
      if (typeof window !== 'undefined' && (window as any).RouteNHNative?.isNativeApp?.()) {
        setShowSplash(false);
        return;
      }

      const splashDone = sessionStorage.getItem('route_nh_splash_completed');
      if (!splashDone) {
        setShowSplash(true);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const handleSplashFinish = () => {
    setShowSplash(false);
  };

  return (
    <>
      {isClient && showSplash && (
        <RouteNHSplashScreen onFinish={handleSplashFinish} standalone={false} />
      )}
      {children}
    </>
  );
}
