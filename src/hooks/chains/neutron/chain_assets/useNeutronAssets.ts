import axios, { all } from "axios";
import { coinConvert } from "../../../../utils/common";
import { useSetRecoilState } from "recoil";
import { neutronAssetState } from "../../../../context/assetsState";
import neutronAssetList from "../astroport/neutronTokenList.json";
import { useNtrnAstroQuery } from "../astroport/useNtrnAstroQuery";

const REST_URL = "https://rest-kralum.neutron-1.neutron.org";

export const useNeutronAssets = () => {
  const setNeutronAssets = useSetRecoilState(neutronAssetState);

  const { getAllAssetBalances } = useNtrnAstroQuery();

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
    // const allAssets = await getNeutronSupply();
    const assetBalances = await getAllAssetBalances();

    Object.keys(assetBalances).forEach((asset: any) => {
      const token = Object.keys(neutronAssetList).find(
        (item) => item === asset
      );

      parsedAssets = [
        ...parsedAssets,
        {
          name: {
            type: "avatar",
            label:
              neutronAssetList[token as keyof typeof neutronAssetList].symbol,
            url: neutronAssetList[token as keyof typeof neutronAssetList].icon,
          },
          amount: assetBalances[asset],
        },
      ];
    });

    setNeutronAssets({
      assets: parsedAssets.sort((a, b) => b.amount - a.amount),
    });

    return parsedAssets;
  };

  return { getNeutronSupply, getParsedNeutronAssets };
};
