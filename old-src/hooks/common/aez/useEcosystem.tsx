import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";
import { coinConvert } from "../../../utils/common";
import axios from "axios";
import { toast } from "react-toastify";
import { StargateClient } from "@cosmjs/stargate";
import showToast from "../../../utils/showToast";

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
      showToast("error", `Request failed with message ${(error as Error).message}`);
    }
  };

  const getAllContractBalances = async (
    stClient: StargateClient,
    coinRegistry: any,
    contractList: Array<any>
  ) => {
    type IConstractList = typeof contractList;
    let assetBalances: any = {};
    let assetBalancesInDenom: any = {};

    try {
      let tvl = 0;
      const prices = await getAllCoinPrices(coinRegistry);

      // Iterate through all the pair contracts
      for (const j in contractList) {
        let totalAmount = 0;

        //For every contract find the balance of each token
        let balances = await stClient.getAllBalances(
          contractList[j].contract_addr
        );

        for (const i in balances) {
          const { amount, denom } = balances[i];

          if (!coinRegistry[denom as keyof IConstractList]) {
            console.log(`${denom} not found in config.`);
            continue;
          }

          // TODO:ibc/2CB87BCE0937B1D1DFCEE79BE4501AAF3C265E923509AEAC410AD85D27F35130 add denom to config

          //Convert it to decimal places
          const balanceInDenom = coinConvert(
            amount as string,
            coinRegistry[denom as keyof IConstractList]?.decimals,
            "human"
          );

          //Calculate the rate in usd
          const rateInUsd =
            prices[coinRegistry[denom as keyof IConstractList].coingecko_id]
              .usd;

          //Calculate the balance in usd
          const balanceInUsd = Number(balanceInDenom) * Number(rateInUsd);

          assetBalancesInDenom = {
            ...assetBalancesInDenom,
            [denom]:
              Number(assetBalancesInDenom[denom] || 0) + Number(balanceInDenom),
          };

          assetBalances = {
            ...assetBalances,
            [denom]: Number(assetBalances[denom] || 0) + balanceInUsd,
          };

          //Sum up the usd balances to get the total amount held by the contract.
          totalAmount = totalAmount + balanceInUsd;
        }
        //Sum up the total balances of each contract
        tvl += totalAmount;
      }
      console.log(assetBalances);
      return { tvl, assetBalances, assetBalancesInDenom };
    } catch (error) {
      console.log(error);
    }
  };

  return { getAllCoinPrices, getAllContractBalances };
};
