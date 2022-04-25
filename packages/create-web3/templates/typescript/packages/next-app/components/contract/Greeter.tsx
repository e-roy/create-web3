import { useEffect, useState, useCallback, FormEvent } from 'react';
import { useContract, useSigner } from 'wagmi';

import contracts from '@/contracts/hardhat_contracts.json';
import { NETWORK_ID, NETWORK_NAME } from '@/config';

export const Greeter = () => {
  const chainId = Number(NETWORK_ID);
  const network = NETWORK_NAME;
  const [currentGreeter, setCurrentGreeter] = useState('');
  const [newGreeter, setNewGreeter] = useState('');

  const { data: signerData } = useSigner();

  const allContracts = contracts as any;
  const greeterAddress = allContracts[chainId][0].contracts.Greeter.address;
  const greeterABI = allContracts[chainId][0].contracts.Greeter.abi;

  const greeterContract = useContract({
    addressOrName: greeterAddress,
    contractInterface: greeterABI,
    signerOrProvider: signerData || undefined,
  });

  const fetchData = useCallback(async () => {
    const greeter = await greeterContract.greet();
    setCurrentGreeter(greeter);
  }, [greeterContract]);

  useEffect(() => {
    if (signerData) {
      fetchData();
    }
  }, [signerData, fetchData]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const tx = await greeterContract.setGreeting(newGreeter);
    setNewGreeter('');
    await tx.wait();
    fetchData();
  };

  return (
    <div style={{ margin: '20px' }}>
      current greeting : {currentGreeter}
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          required
          value={newGreeter}
          onChange={(e) => setNewGreeter(e.target.value)}
        />
        <button type="submit">submit</button>
      </form>
    </div>
  );
};
