import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { useStrideAssets } from "../hooks/chains/stride/chain_assets/useStrideAssets";
import CustomTable from "../components/DataDisplay/CustomTable";
import { useRecoilValue } from "recoil";
import {
  cosmosAssetState,
  neutronAssetState,
  strideAssetState,
} from "../context/assetsState";
import Section from "../components/Layout/Section";
import { useCosmosAssets } from "../hooks/chains/cosmos/chain_assets/useCosmosAssets";
import { useNeutronAssets } from "../hooks/chains/neutron/chain_assets/useNeutronAssets";
import CustomSkeleton from "../components/skeleton/CustomSkeleton";

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
    <Box>
      <Box
        width={"100%"}
        justifyContent={"space-between"}
        display={"flex"}
        gap={"20px"}
      >
        <Section heading="Cosmos">
          {cosmosAssets.assets.length ? (
            <CustomTable
              keys={Object.keys(cosmosAssets?.assets[0])}
              data={cosmosAssets?.assets}
            />
          ) : (
            <CustomSkeleton count={5} height="20px" />
          )}
        </Section>
        <Section heading="Stride">
          {strideAssets.assets.length ? (
            <CustomTable
              keys={Object.keys(strideAssets?.assets[0])}
              data={strideAssets?.assets}
            />
          ) : (
            <CustomSkeleton count={5} height="20px" />
          )}
        </Section>
        <Section heading="Neutron">
          {neutronAssets.assets.length ? (
            <CustomTable
              keys={Object.keys(neutronAssets?.assets[0])}
              data={neutronAssets?.assets}
            />
          ) : (
            <CustomSkeleton count={5} height="20px" />
          )}
        </Section>
      </Box>
    </Box>
  );
};

export default Assets;
