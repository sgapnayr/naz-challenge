"use client";

import {
  ThirdwebProvider,
  metamaskWallet,
  coinbaseWallet,
  walletConnect,
  localWallet,
  embeddedWallet,
  trustWallet,
} from "@thirdweb-dev/react";
import React from "react";

export default function ThirdWebWallet({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThirdwebProvider
      activeChain="mumbai"
      clientId="f0505e0d9739e88b61227c9bfc73fd5d"
      // Qt8x8CqgNH1Ph-c_qF9Ombete3_J8fAhrMveoKRV6iSyZ3p2n7LfXsi25GkC_aDs-dIKkwjAXKV0wZkzt2wzAA
      supportedWallets={[
        metamaskWallet(),
        coinbaseWallet({ recommended: true }),
        walletConnect(),
        localWallet(),
        embeddedWallet({
          auth: {
            options: ["email", "google", "apple", "facebook"],
          },
        }),
        trustWallet(),
      ]}
    >
      {children}
    </ThirdwebProvider>
  );
}
