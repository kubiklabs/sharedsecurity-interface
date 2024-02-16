import axios, { all } from "axios";
import { useSetRecoilState } from "recoil";
import { neutronAssetState } from "../../../../context/assetsState";
import neutronAssetList from "../astroport/neutronTokenList.json";
import { useNtrnAstroQuery } from "../astroport/useNtrnAstroQuery";
import { Neutron } from "../../../../config/nodeConfig.json";

const REST_URL = Neutron.REST;

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
    console.log(assetBalances);

    Object.keys(assetBalances.assetBalances).forEach((asset: any) => {
      const token = Object.keys(neutronAssetList).find(
        (item) => item === asset
      );

      parsedAssets = [
        ...parsedAssets,
        {
          name: {
            type: "avatar",
            label:
              neutronAssetList[token as keyof typeof neutronAssetList]?.symbol,
            url: neutronAssetList[token as keyof typeof neutronAssetList]?.icon,
          },
          amount: assetBalances.assetBalancesInDenom[asset],
          value: assetBalances.assetBalances[asset],
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
