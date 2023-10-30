import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { useState } from "react";
import { useEcosystem } from "../../../common/aez/useEcosystem";
import neutronCoinRegistry from "../astroport/neutronTokenList.json";
import { protocols } from "../../../../config/aezProtocols.json";

import { contracts } from "../../../../config/chains/Neutron/contracts/mars/marsContractList.json";
import { useSetRecoilState } from "recoil";
import { marsTvlState } from "../../../../context/ecosystemState";
import { StargateClient } from "@cosmjs/stargate";

export const useNtrnMarsQuery = () => {
  const [queryClient, setQueryClient] = useState<CosmWasmClient>();
  const [stargateClient, setStargateClient] = useState<StargateClient>();

  const setMarsTvl = useSetRecoilState(marsTvlState);

  const { getAllContractBalances } = useEcosystem();
  const createQueryClient = async () => {
    const queryClient = await CosmWasmClient.connect(
      "https://rpc-kralum.neutron-1.neutron.org"
    );
    setQueryClient(queryClient);
    return queryClient;
  };

  const createStargateClient = async () => {
    const stClient = await StargateClient.connect(
      "https://rpc-kralum.neutron-1.neutron.org"
    );
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
      contracts
    );
    return tvl?.tvl;
  };

  const getParsedMarsData = async () => {
    const tvl = await getTvlMars();
    let data: any = protocols.find(({ name }) => name === "Mars");
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
