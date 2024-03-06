import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { useState } from "react";
import { useEcosystem } from "../../../common/aez/useEcosystem";
import neutronCoinRegistry from "../../../../config/chains/Neutron/neutronTokenList.json";
import protocolList from "../../../../config/aezProtocols.json";

import contractList from "../../../../config/chains/Neutron/contracts/apollo/apolloContractList.json";
import { useSetRecoilState } from "recoil";
import { apolloTvlState } from "../../../../context/ecosystemState";
import { StargateClient } from "@cosmjs/stargate";
import nodeConfig from "../../../../config/nodeConfig.json";

const rpcEndpoint = nodeConfig.Neutron.RPC;

export const useNtrnApolloQuery = () => {
  const [queryClient, setQueryClient] = useState<CosmWasmClient>();
  const [stargateClient, setStargateClient] = useState<StargateClient>();

  const setApolloTvl = useSetRecoilState(apolloTvlState);

  const { getAllContractBalances } = useEcosystem();

  const createStargateClient = async () => {
    const stClient = await StargateClient.connect(rpcEndpoint);
    setStargateClient(stClient);
    return stClient;
  };

  const getTvlApollo = async () => {
    let client = stargateClient;
    if (!client) {
      client = await createStargateClient();
    }

    const tvl = await getAllContractBalances(
      client,
      neutronCoinRegistry,
      contractList.contracts
    );
    return tvl?.tvl;
  };

  const getParsedApolloData = async () => {
    const tvl = await getTvlApollo();
    let data: any = protocolList.protocols.find(
      ({ name }) => name === "Apollo"
    );
    data = {
      ...data,
      tvl,
    };
    setApolloTvl({
      ...data,
      tvl: tvl as number,
    });
    return data;
  };
  return { getTvlApollo, getParsedApolloData };
};
