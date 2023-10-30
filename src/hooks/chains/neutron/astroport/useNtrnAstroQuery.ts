import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import neutronTokenList from "./neutronTokenList.json";
import { astroportFactoryContract } from "../../../../config/chains/Neutron/contracts/astroport/AstroportFactory";
import neutronCoinRegistry from "./neutronTokenList.json";
import axios from "axios";
import { coinConvert } from "../../../../utils/common";
import { pairs } from "../../../../config/chains/Neutron/contracts/astroport/astroportPairList.json";
import { protocols } from "../../../../config/aezProtocols.json";
import { useEcosystem } from "../../../common/aez/useEcosystem";
import { StargateClient } from "@cosmjs/stargate";
import { useSetRecoilState } from "recoil";
import { astroportTvlState } from "../../../../context/ecosystemState";

type INeutronCR = typeof neutronCoinRegistry;

export const useNtrnAstroQuery = () => {
  const [queryClient, setQueryClient] = useState<CosmWasmClient>();
  const [stargateClient, setStargateClient] = useState<StargateClient>();

  const setAstroportTvl = useSetRecoilState(astroportTvlState);

  const { getAllContractBalances } = useEcosystem();

  useEffect(() => {
    createQueryClient();
  }, []);

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
      toast.error(`Query failed with message ${(error as Error).message}`);
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
      toast.error(`Query failed with message ${(error as Error).message}`);
      console.error(error);
    }
  };

  const getAstroPoolDenom = (asset: string) => {
    return neutronTokenList[asset as keyof typeof neutronTokenList];
  };

  const getAllCoinPrices = async () => {
    let id = "";
    try {
      for (const token in neutronCoinRegistry) {
        id +=
          neutronCoinRegistry[token as keyof INeutronCR].coingecko_id + "%2C";
      }

      const response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`
      );
      return response.data;
    } catch (error) {
      console.log(error);

      toast.error(`Request failed with message ${(error as Error).message}`);
    }
  };

  const getTvlAllPools = async () => {
    let client = stargateClient;
    if (!client) {
      client = await createStargateClient();
    }

    const tvl = await getAllContractBalances(
      client,
      neutronCoinRegistry,
      pairs
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
      pairs
    );
    return tvl?.assetBalances;
  };

  const getParsedAstroportData = async () => {
    const tvl = await getTvlAllPools();
    let data: any = protocols.find(({ name }) => name === "Astroport");
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
