import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { coinConvert } from "../../../utils/common";
import axios from "axios";
import { toast } from "react-toastify";

export const useEcosystem = () => {
  const getAllCoinPrices = async (coinRegistry: any) => {
    let id = "";
    try {
      for (const token in coinRegistry) {
        id +=
          coinRegistry[token as keyof typeof coinRegistry].coingecko_id + "%2C";
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

  const getAllContractBalances = async (
    client: CosmWasmClient | undefined,
    coinRegistry: any,
    contractList: Array<any>
  ) => {
    type IConstractList = typeof contractList;
    console.log(client, coinRegistry, contractList);

    try {
      let tvl = 0;
      const prices = await getAllCoinPrices(coinRegistry);
      console.log(prices);

      //   const poolList = pairs;

      // Iterate through all the pair contracts
      for (const i in contractList) {
        let totalAmount = 0;

        //For every contract find the balance of each token
        for (const token in coinRegistry) {
          // console.log(token);

          //Get the balance for the token
          const response = await client?.getBalance(
            contractList[i].contract_addr,
            token
          );
          // console.log(response);

          //Convert it to decimal places
          const balanceInDenom = coinConvert(
            response?.amount as string,
            coinRegistry[token as keyof IConstractList].decimals,
            "human"
          );
          // console.log(token, balanceInDenom);

          //Calculate the rate in usd
          const rateInUsd =
            prices[coinRegistry[token as keyof IConstractList].coingecko_id]
              .usd;

          //Calculate the balance in usd
          const balanceInUsd = Number(balanceInDenom) * Number(rateInUsd);
          // console.log(response);

          //Sum up the usd balances to get the total amount held by the contract.
          totalAmount = totalAmount + balanceInUsd;
        }
        console.log(contractList[i].contract_addr, totalAmount);
        tvl += totalAmount;
      }
      console.log(tvl);
      return tvl;
    } catch (error) {}
  };

  return { getAllCoinPrices, getAllContractBalances };
};
