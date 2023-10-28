import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { useState } from "react";
import { useEcosystem } from "../../../common/aez/useEcosystem";
import neutronCoinRegistry from "../astroport/neutronTokenList.json";
import { protocols } from "../../../../config/aezProtocols.json";

import { contracts } from "../../../../config/chains/Neutron/contracts/mars/marsContractList.json";
import { useSetRecoilState } from "recoil";
import { marsTvlState } from "../../../../context/ecosystemState";

export const useNtrnMarsQuery = () => {
  const [queryClient, setQueryClient] = useState<CosmWasmClient>();

  const setMarsTvl = useSetRecoilState(marsTvlState);

  const { getAllContractBalances } = useEcosystem();
  const createQueryClient = async () => {
    const queryClient = await CosmWasmClient.connect(
      "https://rpc-kralum.neutron-1.neutron.org"
    );
    setQueryClient(queryClient);
    return queryClient;
  };

  const getTvlMars = async () => {
    let client = queryClient;
    if (!client) {
      client = await createQueryClient();
    }

    const tvl = await getAllContractBalances(
      client,
      neutronCoinRegistry,
      contracts
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
