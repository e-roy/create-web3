import { useEffect, useState, useCallback } from 'react';
import { useContract, useProvider } from 'wagmi';

import contracts from '@/contracts/hardhat_contracts.json';
import { NETWORK_ID } from '@/config';

export const GetGreeter = () => {
  const chainId = Number(NETWORK_ID);
  const [currentGreeter, setCurrentGreeter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const provider = useProvider();

  const allContracts = contracts as any;
  const greeterAddress = allContracts[chainId][0].contracts.Greeter.address;
  const greeterABI = allContracts[chainId][0].contracts.Greeter.abi;

  const greeterContract = useContract({
    addressOrName: greeterAddress,
    contractInterface: greeterABI,
    signerOrProvider: provider,
  });

  const fetchData = useCallback(async () => {
    try {
      const greeter = await greeterContract.greet();
      setCurrentGreeter(greeter);
      setError('');
    } catch (error) {
      setError("Contract couldn't be fetched.  Please check your network.");
    }
    setLoading(false);
  }, [greeterContract]);

  useEffect(() => {
    if (provider) {
      fetchData();
    }
  }, [provider, greeterContract, fetchData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div style={{ margin: '20px' }}>
      <span>current greeting : {currentGreeter}</span>
      <button style={{ marginLeft: '20px' }} onClick={() => fetchData()}>
        refresh
      </button>
    </div>
  );
};
