import { useEffect, useState, useCallback } from 'react';
import { useContract, useSigner } from 'wagmi';

import contracts from '../../contracts/hardhat_contracts.json';
import { NETWORK_ID } from '../../config';

export const Greeter = () => {
  const chainId = NETWORK_ID;
  const [currentGreeter, setCurrentGreeter] = useState('');
  const [newGreeter, setNewGreeter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const { data: signerData } = useSigner();

  const greeterAddress = contracts[chainId][0].contracts.Greeter.address;
  const greeterABI = contracts[chainId][0].contracts.Greeter.abi;

  const greeterContract = useContract({
    addressOrName: greeterAddress,
    contractInterface: greeterABI,
    signerOrProvider: signerData,
  });

  const fetchData = useCallback(async () => {
    try {
      const greeter = await greeterContract.greet();
      setCurrentGreeter(greeter);
      setError('');
    } catch (error) {
      setError("Contract couldn't be fetched");
    }
    setLoading(false);
  }, [greeterContract]);

  useEffect(() => {
    if (signerData) {
      fetchData();
    }
  }, [signerData, fetchData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const tx = await greeterContract.setGreeting(newGreeter);
      setNewGreeter('');
      await tx.wait();
      fetchData();
    } catch (error) {
      setError('txn failed, check contract');
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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
