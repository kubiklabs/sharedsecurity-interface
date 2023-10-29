import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import { useStrideAssets } from "../hooks/chains/stride/chain_assets/useStrideAssets";
import CustomTable from "../components/DataDisplay/CustomTable";
import { useRecoilValue } from "recoil";
import { strideAssetState } from "../context/assetsState";
import { data } from "../components/Overview/Trends";
import Section from "../components/Layout/Section";

const Assets = () => {
  const { getStrideSupply, getParsedStrideAssets } = useStrideAssets();
  const strideAssets = useRecoilValue(strideAssetState);

  useEffect(() => {
    getSupply();
  }, []);

  const getSupply = async () => {
    const response = await getParsedStrideAssets();
  };

  return (
    <Box>
      <Box justifyContent={"space-between"} display={"flex"} gap={"20px"}>
        <Section heading="Cosmos">
          {strideAssets.assets.length && (
            <CustomTable
              keys={Object.keys(strideAssets?.assets[0])}
              data={strideAssets?.assets}
            />
          )}
        </Section>
        <Section heading="Stride">
          {strideAssets.assets.length && (
            <CustomTable
              keys={Object.keys(strideAssets?.assets[0])}
              data={strideAssets?.assets}
            />
          )}
        </Section>
        <Section heading="Neutron">
          {strideAssets.assets.length && (
            <CustomTable
              keys={Object.keys(strideAssets?.assets[0])}
              data={strideAssets?.assets}
            />
          )}
        </Section>
      </Box>
    </Box>
  );
};

export default Assets;
