import * as React from 'react';
import type { AppProps } from 'next/app';
import NextHead from 'next/head';
import '../styles/globals.css';

// @TODO: Add Arweave dependencies

const App = ({ Component, pageProps }: AppProps) => {
  const isMounted = useIsMounted();

  if (!isMounted) return null;
  return (
    <>
      <NextHead>
        <title>create-permaweb-app</title>
      </NextHead>
      <Component {...pageProps} />
    </>
  );
};

export default App;
