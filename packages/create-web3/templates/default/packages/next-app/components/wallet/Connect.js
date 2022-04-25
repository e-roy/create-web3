import * as React from 'react';
import { useAccount, useConnect } from 'wagmi';

import { useIsMounted } from '../../hooks';

export const Connect = () => {
  const isMounted = useIsMounted();

  const { activeConnector, connectors, error, connectAsync } = useConnect();
  const { data: accountData } = useAccount();

  const onConnect = async (x) => {
    await connectAsync(x);
  };

  return (
    <div>
      {!activeConnector && (
        <>
          {connectors.map((x, index) => (
            <button
              disabled={
                isMounted
                  ? !x.ready || x.id === accountData?.connector?.id
                  : false
              }
              key={index}
              onClick={() => onConnect(x)}
            >
              {x.name && isMounted ? x.name : null}
            </button>
          ))}
        </>
      )}

      <div> {error && <div>{error.message}</div>}</div>
    </div>
  );
};
