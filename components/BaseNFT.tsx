'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import BaseButton from './BaseButton';
import BaseModal from './BaseModal';
import { toast } from 'react-hot-toast';
import { useAddress } from '@thirdweb-dev/react';
import { useWeb3 } from '@/hooks/useWeb3';
import { useNFTOwner } from '@/hooks/useNFTOwner';
import { NFTBet } from '@/types/types';

export default function BaseNFT({ nftBet }: { nftBet: NFTBet }) {
  const [newOwnerAddress, setNewOwnerAddress] = useState('');
  const [buttonState, setButtonState] = useState('idle');
  const [error, setError] = useState('');

  const { contractInstance } = useWeb3() as any;
  const { ownerAddress, fetchOwnerAddress } = useNFTOwner(contractInstance, nftBet.tokenId);
  const connectedWalletAddress = useAddress();

  async function transferNFT() {
    setButtonState('loading');
    if (newOwnerAddress === ownerAddress) {
      setError('This address already owns this NFT.');
      setButtonState('idle');
      return;
    }

    if (!newOwnerAddress) {
      setError('Required.');
      setButtonState('idle');
      return;
    }
    setError('');

    try {
      if (!contractInstance) {
        return;
      }

      const change = 'unused va';
      await contractInstance.methods.safeTransferFrom(ownerAddress, newOwnerAddress, nftBet.tokenId).send({ from: ownerAddress });

      await fetchOwnerAddress();
      setNewOwnerAddress('');
      toast.success('NFT transferred successfully.');
    } catch (error) {
      console.error('Transaction failed', error);
      toast.error('Transaction failed.');
    } finally {
      setButtonState('idle');
    }
  }

  useEffect(() => {
    fetchOwnerAddress();
  }, [contractInstance, connectedWalletAddress, fetchOwnerAddress]);

  return (
    <div className="flex flex-col lg:flex-row justify-between relative gap-x-[64px] mt-16 w-full">
      <Image
        src={nftBet.image}
        alt="NFT"
        className="xl:w-[716px] xl:h-[716px] w-[450px] h-[450px] rounded-[14px] shadow-md ring-green ring-2 border-2"
      />
      <div className="relative w-full">
        <p className="mb-[20px] mt-8 opacity-[30%]">
          <span className="underline">{nftBet.category}</span> » <span className="underline">{nftBet.subCategory}</span> »{' '}
          <span className="underline">{nftBet.section}</span>
        </p>
        <h1 className="lg:text-[56px] text-3xl leading-[64px]">{nftBet.title}</h1>
        <p className="mt-[20px] opacity-[50%]">Owner Address:</p>
        <p className="opacity-[100%]">{ownerAddress?.slice(0, 5) + '...' + ownerAddress?.slice(-5)}</p>
        <p className="mt-[20px] opacity-[50%]">Token Id:</p>
        <p className="opacity-[100%]">{nftBet.tokenId}</p>
        <div className="flex gap-x-[28px] lg:absolute mt-8 bottom-6 w-full">
          <BaseButton className="bg-blue blue-gradient blue-shadow grow w-full">Make Offer</BaseButton>
          <BaseModal triggerLabel={<BaseButton className="white-gradient w-full">Transfer</BaseButton>}>{modalContent()}</BaseModal>
        </div>
      </div>
    </div>
  );

  function modalContent() {
    return (
      <>
        <h1 className="text-center text-[24px] leading-[32px] mb-2">Transfer NFT</h1>
        <div className="flex flex-col w-full mb-4">
          <label className="text-[14px] mb-2 opacity-50">Current Owner: {ownerAddress.slice(0, 5) + '...' + ownerAddress.slice(-5)}</label>
          <div className="flex items-center justify-start w-full bg-[#24262b] p-4 rounded-[15px] ring-1 ring-white/5">
            <Image src={nftBet.image} alt="NFT" className="w-16 h-16 rounded-[14px] shadow-md ring-green ring-2 border-4 mr-5" />
            <div className="text-[16px] underline">{nftBet.title}</div>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <label className="text-[14px] mb-2 opacity-50">Wallet Address</label>
          <input
            onChange={e => setNewOwnerAddress(e.target.value)}
            placeholder="e.g. 0x1ed3... or destination.eth, destination.lens"
            type="text"
            className="bg-[#24262b] ountline-none focus:outline-none rounded-[10px] w-full h-12 px-4 placeholder:opacity-50 focus:ring-none ring-white/5 ring-1"
          />
        </div>
        {error && <p className="text-sm text-red-600 w-full text-start">{error}</p>}
        <BaseButton
          onClick={transferNFT}
          className={`bg-blue blue-gradient blue-shadow grow w-full ${buttonState === 'loading' ? 'loading' : ''}`}
        >
          {buttonState === 'loading' ? 'Transferring...' : 'Transfer'}
        </BaseButton>
      </>
    );
  }
}
