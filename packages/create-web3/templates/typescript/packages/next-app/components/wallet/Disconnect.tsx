import { useAccount } from 'wagmi';

export const Disconnect = () => {
  const [{ data }, disconnect] = useAccount();

  return (
    <>
      <div>Connected with address : {data?.address}</div>

      <button onClick={disconnect}>
        Disconnect from {data?.connector?.name}
      </button>
    </>
  );
};
