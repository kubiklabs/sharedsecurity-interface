import axios, { all } from "axios";
import strideAssets from "./../../../../config/chains/Stride/stride_asset_list.json";
import { coinConvert } from "../../../../utils/common";
import { useSetRecoilState } from "recoil";
import { strideAssetState } from "../../../../context/assetsState";
import { useEcosystem } from "../../../common/aez/useEcosystem";
import nodeConfig from "../../../../config/nodeConfig.json";

const REST_URL = `${nodeConfig.Stride.REST}`;

export const useStrideAssets = () => {
  const setStrideAssets = useSetRecoilState(strideAssetState);
  const { getAllCoinPrices } = useEcosystem();

  const getStrideSupply = async () => {
    let allSupply: any = [];
    let paginationKey = "";
    while (paginationKey !== null) {
      const response = await axios.get(
        `${REST_URL}/cosmos/bank/v1beta1/supply?pagination.key=${paginationKey}`
      );
      allSupply = [...allSupply, ...response.data.supply];
      paginationKey = response.data.pagination.next_key;
    }
    return allSupply;
  };

  const getParsedStrideAssets = async () => {
    let parsedAssets: any[] = [];
    const allAssets = await getStrideSupply();
    const allPrices = await getAllCoinPrices(strideAssets);

    allAssets.forEach((asset: any) => {
      if (!asset.denom.includes("ibc")) {
        const assetData =
          strideAssets[asset.denom as keyof typeof strideAssets];
        if (!assetData) {
          console.log(`${asset.denom} not found in config`);
          return;
        }

        const price = allPrices[assetData.coingecko_id].price;

        parsedAssets.push({
          name: {
            type: "avatar",
            label: assetData?.name,
            url: assetData.icon,
          },
          total_supply: Number(
            coinConvert(asset.amount, assetData?.decimals, "human")
          ),
          total_amount:
            Number(coinConvert(asset.amount, assetData?.decimals, "human")) *
            Number(price),
        });
      }
    });

    setStrideAssets({
      assets: parsedAssets.sort((a, b) => b.total_amount - a.total_amount),
    });

    return parsedAssets;
  };

  return { getStrideSupply, getParsedStrideAssets };
};
