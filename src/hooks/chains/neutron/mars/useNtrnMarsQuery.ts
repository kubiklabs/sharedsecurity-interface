import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { useState } from "react";
import { useEcosystem } from "../../../common/aez/useEcosystem";
import neutronCoinRegistry from "../../../..//config/chains/Neutron/neutronTokenList.json";
import protocolList from "../../../../config/aezProtocols.json";
import contractList from "../../../../config/chains/Neutron/contracts/mars/marsContractList.json";
import { useSetRecoilState } from "recoil";
import { marsTvlState } from "../../../../context/ecosystemState";
import { StargateClient } from "@cosmjs/stargate";
import nodeConfig from "../../../../config/nodeConfig.json";

const rpcEndpoint = nodeConfig.Neutron.RPC;

export const useNtrnMarsQuery = () => {
  const [queryClient, setQueryClient] = useState<CosmWasmClient>();
  const [stargateClient, setStargateClient] = useState<StargateClient>();

  const setMarsTvl = useSetRecoilState(marsTvlState);

  const { getAllContractBalances } = useEcosystem();
  const createQueryClient = async () => {
    const queryClient = await CosmWasmClient.connect(rpcEndpoint);
    setQueryClient(queryClient);
    return queryClient;
  };

  const createStargateClient = async () => {
    const stClient = await StargateClient.connect(rpcEndpoint);
    setStargateClient(stClient);
    return stClient;
  };

  const getTvlMars = async () => {
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

  const getParsedMarsData = async () => {
    const tvl = await getTvlMars();
    let data: any = protocolList.protocols.find(({ name }) => name === "Mars");
    data = {
      ...data,
      tvl,
    };
    setMarsTvl({
      ...data,
      tvl: tvl as number,
    });
    return data;
  };
  return { getTvlMars, getParsedMarsData };
};
