import type { AppProps } from 'next/app';
import type { FC } from 'react';
import { Toaster } from 'react-hot-toast';
import '../styles/globals.css';

const MyApp: FC<AppProps> = ({ Component, pageProps }) => (
  <>
    <Component {...pageProps} />
    <Toaster
      toastOptions={{
        duration: 5000,
        position: 'bottom-right',
      }}
    />
  </>
);

export default MyApp;
