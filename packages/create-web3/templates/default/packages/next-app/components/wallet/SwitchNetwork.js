import { useNetwork } from 'wagmi';
import { NETWORK_ID, NETWORK_NAME } from '../../config';

export const SwitchNetwork = () => {
  const { activeChain, switchNetwork } = useNetwork();

  if (!activeChain) return null;
  return (
    <div>
      {NETWORK_ID !== activeChain.id && (
        <button onClick={() => switchNetwork(NETWORK_ID)} className="">
          please connect to {NETWORK_NAME}
        </button>
      )}
    </div>
  );
};
