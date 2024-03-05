import axios from "axios";
import { usePriceApi } from "../../../usePriceApi";
// import { get } from "../helper/http";

const coinGeckoIds = {
  uatom: "cosmos",
  ustars: "stargaze",
  ujuno: "juno-network",
  uosmo: "osmosis",
  uluna: "terra-luna-2",
  aevmos: "evmos",
  inj: "injective-protocol",
  uumee: "umee",
  ucmdx: "comdex",
  usomm: "sommelier",
  adydx: "dydx-chain",
};
export const useStrideDefiAdapter = () => {
  const { getMultiplePrice } = usePriceApi();

  const getCoinPrices = async () => {
    const idArray = Object.values(coinGeckoIds);
    const result = await getMultiplePrice(idArray);
    console.log(result);

    return result;
  };

  function getCoinDenom(denom: string) {
    // inj uses 1e18 - https://docs.injective.network/learn/basic-concepts/inj_coin#base-denomination
    const idArray = ["aevmos", "inj"];

    if (idArray.includes(denom)) {
      return 1e18;
    } else {
      return 1e6;
    }
  }

  async function tvl() {
    let tvl = 0;
    const prices = await getCoinPrices();
    console.log(prices);

    const { host_zone: hostZones } = (
      await axios.get(
        "https://stride-fleet.main.stridenet.co/api/Stride-Labs/stride/stakeibc/host_zone"
      )
    ).data;
    console.log(hostZones);

    for (const index in hostZones) {
      const hostZone = hostZones[index];
      const stDenom = "st".concat(hostZone.host_denom);
      const { amount: assetBalances } = (
        await axios.get(
          "https://stride-fleet.main.stridenet.co/api/cosmos/bank/v1beta1/supply/by_denom?denom=".concat(
            stDenom
          )
        )
      ).data;
      const assetBalance = assetBalances["amount"];

      const coinDecimals = getCoinDenom(hostZone.host_denom);

      const amount = assetBalance / coinDecimals;

      const geckoId =
        coinGeckoIds[hostZone.host_denom as keyof typeof coinGeckoIds];

      //TODO: Add support for adydx in config

      if (!geckoId) {
        console.log(`${hostZone.host_denom} not found in config!`);
        continue;
      }
      if (!prices[geckoId]) {
        console.log(`${geckoId} price not found in price api config!`);
        continue;
      }
      console.log(geckoId);

      const amountInUsd =
        Number(prices[geckoId].price) *
        Number(amount) *
        hostZone.redemption_rate;
      tvl += amountInUsd;

      if (!geckoId) {
        throw new Error("Missing gecko mapping: " + hostZone.host_denom);
      }
    }

    return tvl;
  }

  return {
    timetravel: false,
    methodology: "Sum of all the tokens that are liquid staked on Stride",
    stride: {
      tvl,
    },
  };
};