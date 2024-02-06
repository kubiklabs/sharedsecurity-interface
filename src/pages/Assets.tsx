// import {Box, Flex} from "@chakra-ui/react";
import { useEffect } from "react";
import { useStrideAssets } from "../hooks/chains/stride/chain_assets/useStrideAssets";
import { useRecoilValue } from "recoil";
import {
  cosmosAssetState,
  neutronAssetState,
  strideAssetState,
} from "../context/assetsState";
import { useCosmosAssets } from "../hooks/chains/cosmos/chain_assets/useCosmosAssets";
import { useNeutronAssets } from "../hooks/chains/neutron/chain_assets/useNeutronAssets";
import AssetSection1 from "../components/Assets.tsx/AssetSection1";

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

      <AssetSection1 allAssets={[...neutronAssets.assets, ...cosmosAssets.assets,...strideAssets.assets]} neutronAssets={neutronAssets.assets} cosmosAssets={cosmosAssets.assets} strideAssets={strideAssets.assets} />
  );
};

export default Assets;
