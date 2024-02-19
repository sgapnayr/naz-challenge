'use client';

import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  localWallet,
  embeddedWallet,
  trustWallet,
} from '@thirdweb-dev/react';
import React from 'react';

export default function ThirdWebWallet({ children }: { children: React.ReactNode }) {
  return (
    <ThirdwebProvider
      activeChain="mumbai"
      clientId={process.env.NEXT_PUBLIC_CLIENT_ID}
      supportedWallets={[
        metamaskWallet(),
        coinbaseWallet({ recommended: true }),
        walletConnect(),
        localWallet(),
        embeddedWallet({
          auth: {
            options: ['email', 'google', 'apple', 'facebook'],
          },
        }),
        trustWallet(),
      ]}
    >
      {children}
    </ThirdwebProvider>
  );
}
