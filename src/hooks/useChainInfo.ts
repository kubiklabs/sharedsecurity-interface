import cosmosHubChainInfo from "../config/chains/CosmosHub/cosmos_mainnet.json";
import strideChainInfo from "../config/chains/Stride/stride_mainnet.json";
import neutronChainInfo from "../config/chains/Neutron/neutron_mainnet.json";
import { useEffect, useState } from "react";

const chainIDInfoMap = {
  "neutron-1": neutronChainInfo,
  "cosmoshub-4": cosmosHubChainInfo,
  "stride-1": strideChainInfo,
};

export const useChainInfo = (chainName: string) => {
  const [chainInfo, setChainInfo] = useState(
    chainIDInfoMap[chainName as keyof typeof chainIDInfoMap]
  );

  useEffect(() => {
    setChainInfo(chainIDInfoMap[chainName as keyof typeof chainIDInfoMap]);
  }, [chainName]);

  //   const { chainInfo } = useRecoilValue(configState);

  /*
   * Returns the chainInfo data of selected chain
   */
  const getChainInfoData = () => {
    return chainInfo;
  };

  /*
   * Returns the chainId of selected chain
   */
  const getChainId = () => {
    return chainInfo.chain_id;
  };

  /*
   * Returns the RPC url of selected chain
   */
  const getRpcUrl = () => {
    return chainInfo.apis.rpc[3].address;
  };

  /*
   * Returns the REST url of selected chain
   */
  const getRestUrl = () => {
    return chainInfo.apis.rest[0].address;
  };

  const getChainDenom = () => {
    return chainInfo.staking.staking_tokens[0].denom;
  };

  return {
    getChainInfoData,
    getChainId,
    getRpcUrl,
    getRestUrl,
    getChainDenom,
  };
};
