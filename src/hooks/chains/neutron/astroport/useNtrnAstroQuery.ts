import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { useEffect, useState } from "react";
import { astroportFactoryContract } from "../../../../config/chains/Neutron/contracts/astroport/AstroportFactory";
import neutronCoinRegistry from "../../../../config/chains/Neutron/neutronTokenList.json";
import pairList from "../../../../config/chains/Neutron/contracts/astroport/astroportPairList.json";
import protocolList from "../../../../config/aezProtocols.json";
import { useEcosystem } from "../../../common/aez/useEcosystem";
import { StargateClient } from "@cosmjs/stargate";
import { useSetRecoilState } from "recoil";
import { astroportTvlState } from "../../../../context/ecosystemState";

import nodeConfig from "../../../../config/nodeConfig.json";
import showToast from "../../../../utils/showToast";

const rpcEndpoint = nodeConfig.Neutron.RPC;

export const useNtrnAstroQuery = () => {
  const [queryClient, setQueryClient] = useState<CosmWasmClient>();
  const [stargateClient, setStargateClient] = useState<StargateClient>();

  const setAstroportTvl = useSetRecoilState(astroportTvlState);

  const { getAllContractBalances } = useEcosystem();

  useEffect(() => {
    createQueryClient();
  }, []);

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

  const getAllNtrnPairs = async () => {
    let client = queryClient;
    if (!client) {
      client = await createQueryClient();
    }
    try {
      const response = await client?.queryContractSmart(
        astroportFactoryContract.at,
        {
          pairs: {
            limit: 50,
          },
        }
      );
      return response.pairs;
    } catch (error) {
      showToast(
        "error",
        `Query failed with message ${(error as Error).message}`
      );
      console.error(error);
    }
  };

  const getNtrnPoolInfo = async (contractAddress: string) => {
    let client = queryClient;
    if (!client) {
      client = await createQueryClient();
    }
    try {
      const response = await client?.queryContractSmart(contractAddress, {
        pool: {},
      });
      return response;
    } catch (error) {
      showToast(
        "error",
        `Query failed with message ${(error as Error).message}`
      );
      console.error(error);
    }
  };

  // const getAstroPoolDenom = (asset: string) => {
  //   return neutronTokenList[asset as keyof typeof neutronTokenList];
  // };

  // const getAllCoinPrices = async () => {
  //   let id = "";
  //   try {
  //     for (const token in neutronCoinRegistry) {
  //       id +=
  //         neutronCoinRegistry[token as keyof INeutronCR].coingecko_id + "%2C";
  //     }

  //     const response = await axios.get(
  //       `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`
  //     );
  //     return response.data;
  //   } catch (error) {
  //     console.log(error);

  //     showToast(
  //       "error",
  //       `Request failed with message ${(error as Error).message}`
  //     );
  //   }
  // };

  const getTvlAllPools = async () => {
    let client = stargateClient;
    if (!client) {
      client = await createStargateClient();
    }

    const tvl = await getAllContractBalances(
      client,
      neutronCoinRegistry,
      pairList.pairs
    );
    return tvl?.tvl;
  };

  const getAllAssetBalances = async () => {
    let client = stargateClient;
    if (!client) {
      client = await createStargateClient();
    }

    const tvl = await getAllContractBalances(
      client,
      neutronCoinRegistry,
      pairList.pairs
    );

    return {
      assetBalances: tvl?.assetBalances,
      assetBalancesInDenom: tvl?.assetBalancesInDenom,
    };
  };

  const getParsedAstroportData = async () => {
    const tvl = await getTvlAllPools();
    let data: any = protocolList.protocols.find(
      ({ name }) => name === "Astroport"
    );
    data = {
      ...data,
      tvl,
    };
    setAstroportTvl({
      ...data,
      tvl: tvl as number,
    });
    return data;
  };

  return {
    getTvlAllPools,
    getAllNtrnPairs,
    getNtrnPoolInfo,
    getParsedAstroportData,
    getAllAssetBalances,
  };
};
