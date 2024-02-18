"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import BaseButton from "./BaseButton";
import BaseModal from "./BaseModal";
import { useContract } from "@thirdweb-dev/react";
import Web3 from "web3";
import { toast } from "react-hot-toast";
import { useAddress } from "@thirdweb-dev/react";

export default function BaseNFT({ nftBet }: { nftBet: any }) {
  const [useContractInstance, setUseContract] = useState<any>("");
  const [ownerAddress, setOwnerAddress] = useState<string>("");
  const [newOwnerAddress, setNewOwnerAddress] = useState<string>("");
  const [buttonState, setButtonState] = useState("idle");
  const [error, setError] = useState("");

  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
  const connectedWalletAddress = useAddress();

  useEffect(() => {
    const initWeb3 = async () => {
      if (contract && connectedWalletAddress) {
        const web3Instance = new Web3(window.ethereum);
        const contractInstance = new web3Instance.eth.Contract(
          contract.abi,
          process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
        );
        setUseContract(contractInstance);
      }
    };

    initWeb3();
  }, [connectedWalletAddress, contract]);

  async function transferNFT() {
    setButtonState("loading");
    if (newOwnerAddress == ownerAddress) {
      setError("You already own this NFT.");
      setButtonState("idle");
      return;
    }

    if (!newOwnerAddress) {
      setError("Required");
      setButtonState("idle");
      return;
    }
    setError("");

    try {
      const receipt = await useContractInstance.methods
        .safeTransferFrom(ownerAddress, newOwnerAddress, nftBet.tokenId)
        .send({ from: ownerAddress });

      await fetchOwnerAddress();
      setOwnerAddress(newOwnerAddress);
      setNewOwnerAddress("");
      console.log(receipt);
      toast.success("NFT transferred successfully.");
    } catch (error) {
      console.error("Transaction failed", error);
      toast.error("Transaction failed.");
    } finally {
      setButtonState("idle");
    }
  }

  async function fetchOwnerAddress() {
    setOwnerAddress("");
    try {
      const address = await useContractInstance.methods
        .ownerOf(nftBet.tokenId)
        .call();
      setOwnerAddress(address);
    } catch (error) {
      console.error("Error fetching owner address:", error);
    }
  }

  useEffect(() => {
    fetchOwnerAddress();
  }, [useContractInstance, connectedWalletAddress]);

  return (
    <div className="flex flex-col lg:flex-row justify-start relative gap-x-[64px] mt-16">
      <Image
        src={nftBet.image}
        alt="NFT"
        className="xl:max-w-[716px] xl:max-h-[716px] w-1/2 h-1/2 rounded-[14px] shadow-md ring-green ring-2 border-2"
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
        <p className="opacity-[100%]">
          {ownerAddress?.slice(0, 5) + "..." + ownerAddress?.slice(-5)}
        </p>
        <p className="mt-[20px] opacity-[50%]">Token Id:</p>
        <p className="opacity-[100%]">{nftBet.tokenId}</p>
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
