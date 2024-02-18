import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import BaseButton from "./BaseButton";
import Image from "next/image";

function BaseModal({
  children,
  nftBet,
  ownerAddress,
  transferNFT,
  setNewOwnerAddress,
  buttonState,
  error,
}: {
  children: React.ReactNode;
  nftBet: any;
  ownerAddress: string;
  transferNFT: any;
  setNewOwnerAddress: any;
  buttonState: string;
  error: boolean;
}) {
  return (
    <Dialog>
      <DialogTrigger className="w-full">{children}</DialogTrigger>
      <DialogContent className="bg-modal border-none rounded-[15px] ring-1 ring-white/5 flex flex-col items-center">
        <h1 className="text-center text-[24px] leading-[32px] mb-2 mt-2">
          Transfer
        </h1>
        <div className="flex flex-col w-full mb-4">
          <label className="text-[14px] mb-2 opacity-50">
            Current Owner:{" "}
            {ownerAddress.slice(0, 5) + "..." + ownerAddress.slice(-5)}
          </label>
          <div className="flex items-center justify-start w-full bg-[#24262b] p-4 rounded-[15px] ring-1 ring-white/5">
            <Image
              src={nftBet.image}
              alt="NFT"
              className="w-16 h-16 rounded-[14px] shadow-md ring-green ring-2 border-4 mr-5"
            />
            <div className="text-[16px] underline">{nftBet.title}</div>
          </div>
        </div>

        <div className="my-2 h-[1px] bg-white/5 w-full" />

        <div className="flex flex-col w-full mb-4">
          <label className="text-[14px] mb-2 opacity-50">Wallet Address</label>
          <input
            onChange={(e) => setNewOwnerAddress(e.target.value)}
            placeholder="e.g. 0x1ed3... or destination.eth, destination.lens"
            type="text"
            className="bg-[#24262b] ountline-none focus:outline-none rounded-[10px] w-full h-12 px-4 placeholder:opacity-50 focus:ring-none ring-white/5 ring-1"
          />
          {error && <p className="text-sm text-red-600 mt-1">Required</p>}
        </div>

        <BaseButton
          buttonState={buttonState}
          onClick={transferNFT}
          className="bg-blue blue-gradient blue-shadow grow w-full"
        >
          Transfer
        </BaseButton>
      </DialogContent>
    </Dialog>
  );
}

export default BaseModal;
