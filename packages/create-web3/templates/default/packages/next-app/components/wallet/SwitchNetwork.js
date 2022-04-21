import { useNetwork } from "wagmi";
import config from "../../config.json";

export const SwitchNetwork = () => {
  const [{ data: networkData }, switchNetwork] = useNetwork();

  if (!networkData.chain?.id) return null;
  return (
    <div>
      <div>
        {config.network.id !== networkData.chain.id && (
          <button
            onClick={() => switchNetwork(config.network.id)}
            className="p-2 rounded text-red-600"
          >
            please connect to {config.network.name}
          </button>
        )}
      </div>
    </div>
  );
};
