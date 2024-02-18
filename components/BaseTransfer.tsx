"use client";

import { useContract, useTransferNFT, Web3Button } from "@thirdweb-dev/react";

// Your NFT collection contract address
const contractAddress = "0x968c8ee58936a7c1d7753258ed4d3ce577369cb9";
const walletAddress = "0xaf6fe184f45acfe27313387bb614ce84357c0229";
const tokenId = "1";

export default function BaseTransfer() {
  // Contract must be an ERC-721 or ERC-1155 contract
  const { contract } = useContract(contractAddress);
  const {
    mutateAsync: transferNFT,
    isLoading,
    error,
  } = useTransferNFT(contract);

  return (
    <>
      <Web3Button
        contractAddress={contractAddress}
        action={() =>
          transferNFT({
            to: "0x5c56666017FF339273AEBc547D3ebeDaEC214e33", // Address to transfer the token to
            tokenId: tokenId, // Token ID to transfer
          })
        }
      >
        Transfer
      </Web3Button>
      TRANSFER TOKEN
    </>
  );
}
