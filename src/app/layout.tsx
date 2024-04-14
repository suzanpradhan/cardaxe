import Header from '@/components/Header';
import clsx from 'clsx';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import 'react-toastify/dist/ReactToastify.css';
import Notification from '../components/Notification';
import Providers from '../core/redux/providers';
import './globals.css';

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
    <html lang="en" className="">
      <body className={clsx(inter.className, 'relative overflow-x-clip')}>
        <Header />
        <Providers>
          <main>{children}</main>
        </Providers>
        <Notification />
      </body>
    </html>
  );
}
