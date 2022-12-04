import '../styles/globals.css';
import Header from './Header';
import Providers from './Providers';

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
