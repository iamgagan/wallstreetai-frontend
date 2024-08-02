import type { Metadata } from 'next';
import './globals.css';
import { SessionProvider } from 'next-auth/react';
import { ReactQueryProvider } from './provider';
import { StoreProvider } from '@/store/store';

export const metadata: Metadata = {
  title: 'Wall Street AI Resume Builder',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StoreProvider>
        <ReactQueryProvider>
          <SessionProvider>
            <body>{children}</body>
          </SessionProvider>
        </ReactQueryProvider>
      </StoreProvider>
    </html>
  );
}
