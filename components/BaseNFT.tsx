import React from "react";
import Image, { StaticImageData } from "next/image";
import BaseButton from "./BaseButton";
import BaseModal from "./BaseModal";

export default function BaseNFT({ nftBet }: { nftBet: any }) {
  return (
    <div className="flex flex-col lg:flex-row justify-start relative gap-x-[64px]">
      <Image
        src={nftBet.image}
        alt="NFT"
        className="xl:max-w-[716px] xl:max-h-[716px] w-1/2 h-1/2 rounded-[14px] shadow-md ring-green ring-2 border-4"
      />
      <div className="relative">
        <p className="mb-[20px] mt-8 opacity-[30%]">
          <span className="underline">Basketball</span> »{" "}
          <span className="underline">NBA Finals</span> »{" "}
          <span className="underline">Lakers vs Celtics</span>
        </p>
        <h1 className="lg:text-[56px] text-3xl leading-[64px]">
          {nftBet.title}
        </h1>
        <p className="mt-[20px] opacity-[50%]">Owner Address: 0x123...456</p>
        <div className="flex gap-x-[28px] lg:absolute mt-8 bottom-6 w-full">
          <BaseButton className="bg-blue blue-gradient blue-shadow grow w-full">
            Make Offer
          </BaseButton>
          <BaseModal nftBet={nftBet}>
            <BaseButton className="white-gradient w-full">Transfer</BaseButton>
          </BaseModal>
        </div>
      </div>
    </div>
  );
}
