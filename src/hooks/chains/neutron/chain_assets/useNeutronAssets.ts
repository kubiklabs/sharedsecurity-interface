import axios, { all } from "axios";
import { coinConvert } from "../../../../utils/common";
import { useSetRecoilState } from "recoil";
import { neutronAssetState } from "../../../../context/assetsState";

const REST_URL = "https://rest-kralum.neutron-1.neutron.org";

export const useNeutronAssets = () => {
  const setNeutronAssets = useSetRecoilState(neutronAssetState);

  const getNeutronSupply = async () => {
    let allSupply: any = [];
    const response = await axios.get(
      `${REST_URL}/cosmos/bank/v1beta1/supply/untrn`
    );
    allSupply.push(response.data.amount);

    return allSupply;
  };

  const getParsedNeutronAssets = async () => {
    let parsedAssets: any[] = [];
    const allAssets = await getNeutronSupply();

    allAssets.forEach((asset: any) => {
      parsedAssets = [
        {
          name: {
            type: "avatar",
            label: "NTRN",
            url: "",
          },
          amount: Number(
            coinConvert(asset.amount, 6, "human")
          ).toLocaleString(),
        },
      ];
    });

    setNeutronAssets({
      assets: parsedAssets,
    });

    return parsedAssets;
  };

  return { getNeutronSupply, getParsedNeutronAssets };
};
