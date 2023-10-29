import axios, { all } from "axios";
import strideAssets from "./stride_asset_list.json";
import { coinConvert } from "../../../../utils/common";
import { useSetRecoilState } from "recoil";
import { strideAssetState } from "../../../../context/assetsState";

const REST_URL = "https://stride-api.polkachu.com";

export const useStrideAssets = () => {
  const setStrideAssets = useSetRecoilState(strideAssetState);

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
    let parsedAssets: any = [];
    const allAssets = await getStrideSupply();

    allAssets.forEach((asset: any) => {
      if (!asset.denom.includes("ibc")) {
        const assetData =
          strideAssets[asset.denom as keyof typeof strideAssets];
        parsedAssets.push({
          name: {
            type: "avatar",
            label: assetData?.name,
            url: assetData.icon,
          },
          amount: Number(
            coinConvert(asset.amount, assetData?.decimals, "human")
          ).toLocaleString(),
        });
      }
    });

    setStrideAssets({
      assets: parsedAssets,
    });

    return parsedAssets;
  };

  return { getStrideSupply, getParsedStrideAssets };
};
