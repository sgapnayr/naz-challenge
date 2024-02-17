import React from "react";
import NFTImage from "@/assets/nft1.png";
import Image from "next/image";
import BaseButton from "./BaseButton";

export default function BaseNFT() {
  return (
    <div className="flex flex-col lg:flex-row gap-x-[64px] items-start justify-center">
      <Image
        src={NFTImage}
        alt="NFT"
        className="xl:max-w-[716px] xl:max-h-[716px] w-1/2 h-1/2 rounded-[14px]"
      />

      <div className="flex flex-col justify-start">
        <p className="mb-[20px] mt-8 opacity-[30%]">
          <span className="underline">Basketball</span> »{" "}
          <span className="underline">NBA Finals</span> »{" "}
          <span className="underline">Lakers vs Celtics</span>
        </p>
        <h1 className="lg:text-[56px] text-3xl leading-[64px]">
          Lakers to win in the NBA Finals
        </h1>
        <p className="mt-[20px] opacity-[50%]">Owner Address: 0x123...456</p>
        <div className="flex gap-x-[28px]">
          <BaseButton className="bg-blue blue-gradient blue-shadow grow">
            Make Offer
          </BaseButton>
          <BaseButton className="white-gradient grow">Transfer</BaseButton>
        </div>
      </div>
    </div>
  );
}
