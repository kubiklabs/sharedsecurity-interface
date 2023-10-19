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

type INeutronCR = typeof neutronCoinRegistry;

export const useNtrnAstroQuery = () => {
  const [queryClient, setQueryClient] = useState<CosmWasmClient>();

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
    let client = queryClient;
    if (!client) {
      client = await createQueryClient();
    }

    const tvl = await getAllContractBalances(
      client,
      neutronCoinRegistry,
      pairs
    );

    // try {
    //   let tvl = 0;
    //   const prices = await getAllCoinPrices();

    //   const poolList = pairs;

    //   // Iterate through all the pair contracts
    //   for (const i in poolList) {
    //     let totalAmount = 0;

    //     //For every contract find the balance of each token
    //     for (const token in neutronCoinRegistry) {
    //       //Get the balance for the token

    //       const response = await client?.getBalance(
    //         poolList[i].contract_addr,
    //         token
    //       );

    //       //Convert it to decimal places
    //       const balanceInDenom = coinConvert(
    //         response?.amount as string,
    //         neutronCoinRegistry[token as keyof INeutronCR].decimals,
    //         "human"
    //       );

    //       //Calculate the rate in usd
    //       const rateInUsd =
    //         prices[neutronCoinRegistry[token as keyof INeutronCR].coingecko_id]
    //           .usd;

    //       //Calculate the balance in usd
    //       const balanceInUsd = Number(balanceInDenom) * Number(rateInUsd);

    //       //Sum up the usd balances to get the total amount held by the contract.
    //       totalAmount = totalAmount + balanceInUsd;
    //     }
    //     console.log(poolList[i].contract_addr, totalAmount);
    //     tvl += totalAmount;
    //   }
    //   console.log(tvl);
    //   return tvl;
    // } catch (error) {}
    return tvl;
  };

  const getParsedAstroportData = async () => {
    const tvl = await getTvlAllPools();
    let data: any = protocols.find(({ name }) => name === "Astroport");
    data = {
      ...data,
      tvl,
    };
    return data;
  };

  return {
    getTvlAllPools,
    getAllNtrnPairs,
    getNtrnPoolInfo,
    getParsedAstroportData,
  };
};
