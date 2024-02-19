import { useState, useEffect } from 'react';
import Web3 from 'web3';
import { useContract } from '@thirdweb-dev/react';

export function useWeb3() {
  const [web3, setWeb3] = useState(null);
  const [contractInstance, setContractInstance] = useState(null);
  const { contract } = useContract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);

  useEffect(() => {
    if (window.ethereum && contract) {
      const web3Instance = new Web3(window.ethereum);
      const instance = new web3Instance.eth.Contract(contract.abi, process.env.NEXT_PUBLIC_CONTRACT_ADDRESS);
      setWeb3(web3Instance);
      setContractInstance(instance);
    }
  }, [contract]);

  return { web3, contractInstance };
}
