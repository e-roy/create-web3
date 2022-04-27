import * as React from 'react';
import NextHead from 'next/head';
import '../styles/globals.css';

// Imports
import { Provider, chain, createClient, defaultChains } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';

import { useIsMounted } from '../hooks';

// Get environment variables
const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID;
// const infuraId = process.env.NEXT_PUBLIC_INFURA_ID;

// Pick chains
const chains = defaultChains;
const defaultChain = chain.mainnet;

// Set up connectors
const client = createClient({
  autoConnect: true,
  connectors({ chainId }) {
    const chain = chains.find((x) => x.id === chainId) ?? defaultChain;
    const rpcUrl = chain.rpcUrls.alchemy
      ? `${chain.rpcUrls.alchemy}/${alchemyId}`
      : typeof chain.rpcUrls.default === 'string'
      ? chain.rpcUrls.default
      : chain.rpcUrls.default[0];
    return [
      new InjectedConnector(),
      new CoinbaseWalletConnector({
        options: {
          appName: 'create-web3',
          chainId: chain.id,
          jsonRpcUrl: rpcUrl,
        },
      }),
      new WalletConnectConnector({
        options: {
          qrcode: true,
          rpc: {
            [chain.id]: rpcUrl,
          },
        },
      }),
    ];
  },
});

const App = ({ Component, pageProps }) => {
  const isMounted = useIsMounted();

  if (!isMounted) return null;
  return (
    <Provider client={client}>
      <NextHead>
        <title>create-web3</title>
      </NextHead>

      <Component {...pageProps} />
    </Provider>
  );
};

export default App;
