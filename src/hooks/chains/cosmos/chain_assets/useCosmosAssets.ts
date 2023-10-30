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

    allAssets.forEach((asset: any) => {
      parsedAssets = [
        {
          name: {
            type: "avatar",
            label: "ATOM",
            url: "https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.png",
          },
          amount: Number(
            coinConvert(asset.amount, 6, "human")
          ).toLocaleString(),
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
