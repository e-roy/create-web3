import '../styles/globals.css';

import * as React from 'react';
import { providers } from 'ethers';
import NextHead from 'next/head';

// Imports
import { Provider, chain, defaultChains } from 'wagmi';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';

// Get environment variables
const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID;
const etherscanApiKey = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;
const infuraId = process.env.NEXT_PUBLIC_INFURA_ID;

// Pick chains
const chains = defaultChains;
const defaultChain = chain.mainnet;

// Set up connectors
const connectors = ({ chainId }) => {
  const rpcUrl =
    chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ??
    defaultChain.rpcUrls[0];
  return [
    new InjectedConnector({ chains, options: { shimDisconnect: true } }),
    new WalletConnectConnector({
      chains,
      options: {
        infuraId,
        qrcode: true,
      },
    }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'create-web3',
        jsonRpcUrl: `${rpcUrl}/${infuraId}`,
      },
    }),
  ];
};

// Set up providers
const isChainSupported = (chainId) => chains.some((x) => x.id === chainId);

const provider = ({ chainId }) =>
  providers.getDefaultProvider(
    isChainSupported(chainId) ? chainId : defaultChain.id,
    {
      alchemy: alchemyId,
      infura: infuraId,
    }
  );
const webSocketProvider = ({ chainId }) =>
  isChainSupported(chainId)
    ? new providers.InfuraWebSocketProvider(chainId, infuraId)
    : undefined;

const App = ({ Component, pageProps }) => {
  return (
    <Provider
      autoConnect
      connectors={connectors}
      provider={provider}
      webSocketProvider={webSocketProvider}
    >
      <NextHead>
        <title>create-web3</title>
      </NextHead>

      <Component {...pageProps} />
    </Provider>
  );
};

export default App;
