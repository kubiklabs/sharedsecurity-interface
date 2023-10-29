import axios from "axios";
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
};

const getCoinPrices = async () => {
  let ids = "";

  for (const id in coinGeckoIds) {
    ids += coinGeckoIds[id as keyof typeof coinGeckoIds] + "%2C";
  }
  const response = await axios.get(
    `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd`
  );

  return response.data;
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
  const balances = {};
  let tvl = 0;
  const prices = await getCoinPrices();

  const { host_zone: hostZones } = (
    await axios.get(
      "https://stride-fleet.main.stridenet.co/api/Stride-Labs/stride/stakeibc/host_zone"
    )
  ).data;
  //   console.log(hostZones);

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

    const amountInUsd =
      Number(prices[geckoId].usd) * Number(amount) * hostZone.redemption_rate;
    tvl += amountInUsd;

    if (!geckoId) {
      throw new Error("Missing gecko mapping: " + hostZone.host_denom);
    }
  }

  return tvl;
}

export default {
  timetravel: false,
  methodology: "Sum of all the tokens that are liquid staked on Stride",
  stride: {
    tvl,
  },
};
