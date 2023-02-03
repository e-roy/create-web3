import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

import { ChakraProvider } from '@chakra-ui/react';

// Imports
import { createClient, WagmiConfig, configureChains } from 'wagmi';
import {
  mainnet,
  polygon,
  polygonMumbai,
  optimism,
  arbitrum,
  hardhat,
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';

const { chains, provider, webSocketProvider } = configureChains(
  [mainnet, polygon, polygonMumbai, optimism, arbitrum, hardhat],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'create-web3',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider coolMode chains={chains}>
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);
