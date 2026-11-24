import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import AppSplashProvider from '@/components/AppSplashProvider';

export const metadata: Metadata = {
  title: 'Route NH - Road Transportation & Logistics Management Platform',
  description: 'Enterprise Road Logistics & Fleet Management Platform for India',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
        <AppSplashProvider>
          <Navbar />
          <main className="flex-1 flex flex-col">{children}</main>
        </AppSplashProvider>
      </body>
    </html>
  );
}
