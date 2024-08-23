import type { Metadata } from 'next';
import { Archivo } from 'next/font/google';
import './globals.css';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Suspense } from 'react';

const archivo = Archivo({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'GamerShop',
  description: 'GamerShop ecommerce.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={archivo.className}>
        <div className='min-h-screen flex flex-col'>
          <Header></Header>
          <Suspense>{children}</Suspense>
          <Footer></Footer>
        </div>
      </body>
    </html>
  );
}
