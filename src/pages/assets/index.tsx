/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from "react";
import { useStrideAssets } from "@/hooks/chains/stride/chain_assets/useStrideAssets";
import { useRecoilValue } from "recoil";
import {
  cosmosAssetState,
  neutronAssetState,
  strideAssetState,
} from "@/context/assetsState";
import { useCosmosAssets } from "@/hooks/chains/cosmos/chain_assets/useCosmosAssets";
import { useNeutronAssets } from "@/hooks/chains/neutron/chain_assets/useNeutronAssets";
import AssetSection1 from "@/components/Assets/AssetSection1";
import BrowserTitle from "@/components/BrowserTitle/BrowserTitle";

const Assets = () => {
  const { getParsedStrideAssets } = useStrideAssets();
  const { getParsedCosmosAssets } = useCosmosAssets();
  const { getParsedNeutronAssets } = useNeutronAssets();


  const strideAssets = useRecoilValue(strideAssetState);
  const cosmosAssets = useRecoilValue(cosmosAssetState);
  const neutronAssets = useRecoilValue(neutronAssetState);


  useEffect(() => {
    getSupply();
  }, []);


  const getSupply = async () => {
    if (!strideAssets.assets.length) getParsedStrideAssets();
    if (!cosmosAssets.assets.length) getParsedCosmosAssets();
    if (!neutronAssets.assets.length) getParsedNeutronAssets();
  };



  return (
    <>
      <BrowserTitle title="Assets" />
      <AssetSection1 allAssets={[...neutronAssets.assets, ...cosmosAssets.assets, ...strideAssets.assets]} neutronAssets={neutronAssets.assets} cosmosAssets={cosmosAssets.assets} strideAssets={strideAssets.assets} areAllAssetsLoaded={(strideAssets.assets.length > 0 && cosmosAssets.assets.length > 0 && neutronAssets.assets.length > 0) ? true : false} />
    </>
  );
};

export default Assets;
