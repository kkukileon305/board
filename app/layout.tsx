import '../styles/globals.css';
import Header from '../components/header/Header';
import Providers from '../components/Providers';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
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
