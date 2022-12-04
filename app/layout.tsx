import '../styles/globals.css';
import Header from '../components/header/Header';
import Providers from '../components/Providers';

import { Noto_Sans_KR } from '@next/font/google';

const notosans = Noto_Sans_KR({
  weight: ['300', '700'],
  subsets: ['korean'],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={notosans.className}>
      <head />
      <body className='min-h-[100vh] bg-white dark:bg-gray-700'>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
