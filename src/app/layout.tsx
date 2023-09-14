import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Notification from '../components/Notification';
import Providers from './Providers/providers';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cardaxe',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <Notification />
      </body>
    </html>
  );
}
