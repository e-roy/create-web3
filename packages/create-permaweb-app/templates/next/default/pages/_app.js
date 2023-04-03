import * as React from 'react';
import NextHead from 'next/head';
import '../styles/globals.css';

// @TODO: Add Arweave dependencies

const App = ({ Component, pageProps }) => {
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
