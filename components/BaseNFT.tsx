"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import BaseButton from "./BaseButton";
import BaseModal from "./BaseModal";
import { useContract } from "@thirdweb-dev/react";
import Web3 from "web3";

export default function BaseNFT({ nftBet }: { nftBet: any }) {
  const [contractInstance, setUseContract] = useState<any>();
  const [ownerAddress, setOwnerAddress] = useState<string>("");
  const [newOwnerAddress, setNewOwnerAddress] = useState<string>("");
  const [buttonState, setButtonState] = useState("idle");
  const [error, setError] = useState(false);

  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum && contract) {
        const web3Instance = new Web3(window.ethereum);
        const contractInstance = new web3Instance.eth.Contract(
          contract.abi,
          process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
        );
        setUseContract(contractInstance);
      }
    };

    initWeb3();
  }, []);

  async function fetchOwnerAddress() {
    try {
      const address = await contractInstance.methods
        .ownerOf(nftBet.tokenId)
        .call();
      setOwnerAddress(address);
    } catch (error) {
      console.error("Error fetching owner address:", error);
    }
  }

  async function transferNFT() {
    setButtonState("loading");
    if (!newOwnerAddress) {
      setError(true);
      setButtonState("idle");
      return;
    }
    setError(false);

    try {
      const receipt = await contractInstance.methods
        .safeTransferFrom(ownerAddress, newOwnerAddress, nftBet.tokenId)
        .send({ from: ownerAddress });

      fetchOwnerAddress();
      console.log(receipt);
    } catch (error) {
      console.error("Transaction failed", error);
    } finally {
      setButtonState("idle");
    }
  }

  useEffect(() => {
    if (contractInstance) {
      fetchOwnerAddress();
    }
  }, [contractInstance]);

  return (
    <div className="flex flex-col lg:flex-row justify-start relative gap-x-[64px] mt-16">
      <Image
        src={nftBet.image}
        alt="NFT"
        className="xl:max-w-[716px] xl:max-h-[716px] w-1/2 h-1/2 rounded-[14px] shadow-md ring-green ring-2 border-4"
      />
      <div className="relative">
        <p className="mb-[20px] mt-8 opacity-[30%]">
          <span className="underline">{nftBet.category}</span> »{" "}
          <span className="underline">{nftBet.subCategory}</span> »{" "}
          <span className="underline">{nftBet.section}</span>
        </p>
        <h1 className="lg:text-[56px] text-3xl leading-[64px]">
          {nftBet.title}
        </h1>
        <p className="mt-[20px] opacity-[50%]">Owner Address:</p>
        <p className="opacity-[100%]">{ownerAddress}</p>
        <div className="flex gap-x-[28px] lg:absolute mt-8 bottom-6 w-full">
          <BaseButton className="bg-blue blue-gradient blue-shadow grow w-full">
            Make Offer
          </BaseButton>
          <BaseModal
            error={error}
            buttonState={buttonState}
            transferNFT={transferNFT}
            ownerAddress={ownerAddress}
            setNewOwnerAddress={setNewOwnerAddress}
            nftBet={nftBet}
          >
            <BaseButton className="white-gradient w-full">Transfer</BaseButton>
          </BaseModal>
        </div>
      </div>
    </div>
  );
}
