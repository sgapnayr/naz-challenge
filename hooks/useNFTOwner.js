import { useState, useEffect } from 'react';

export function useNFTOwner(contractInstance, tokenId) {
  const [ownerAddress, setOwnerAddress] = useState('');

  const fetchOwnerAddress = async () => {
    if (!contractInstance || !tokenId) return;

    try {
      const address = await contractInstance.methods.ownerOf(tokenId).call();
      setOwnerAddress(address);
    } catch (error) {
      console.error('Error fetching owner address:', error);
    }
  };

  useEffect(() => {
    fetchOwnerAddress();
  }, [contractInstance, tokenId]);

  return { ownerAddress, fetchOwnerAddress };
}
