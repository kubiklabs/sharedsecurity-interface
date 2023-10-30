import axios, { all } from "axios";
import { coinConvert } from "../../../../utils/common";
import { useSetRecoilState } from "recoil";
import { cosmosAssetState } from "../../../../context/assetsState";

const REST_URL = "https://cosmos-rest.publicnode.com";

export const useCosmosAssets = () => {
  const setCosmosAssets = useSetRecoilState(cosmosAssetState);

  const getCosmosSupply = async () => {
    let allSupply: any = [];
    const response = await axios.get(
      `${REST_URL}/cosmos/bank/v1beta1/supply/uatom`
    );
    allSupply.push(response.data.amount);

    return allSupply;
  };

  const getParsedCosmosAssets = async () => {
    let parsedAssets: any[] = [];
    const allAssets = await getCosmosSupply();

    const price = (
      await axios.get(
        "https://api.coingecko.com/api/v3/simple/price?ids=cosmos&vs_currencies=usd"
      )
    ).data.cosmos.usd;

    allAssets.forEach((asset: any) => {
      parsedAssets = [
        {
          name: {
            type: "avatar",
            label: "ATOM",
            url: "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.png",
          },
          amount: Number(coinConvert(asset.amount, 6, "human")) * price,
        },
      ];
    });

    setCosmosAssets({
      assets: parsedAssets,
    });

    return parsedAssets;
  };

  return { getCosmosSupply, getParsedCosmosAssets };
};
