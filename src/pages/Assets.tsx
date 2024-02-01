import {Box, Flex} from "@chakra-ui/react";
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
import AssetGraph from "../components/Assets.tsx/AssetGraph";

export const options = {
  responsive: true,
  plugins: {
    customCanvasBackgroundColor: {
      color: "lightGreen",
    },
    colors: {
      forceOverride: true,
    },
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chains",
    },
    decimation: {
      enabled: true,
      algoritghm: "min-max",
      sample: 50,
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Date",
      },
      border: {
        display: true,
      },
      grid: {
        display: true,
        drawOnChartArea: true,
        drawTicks: true,
        color: "#000",
      },
    },
    y: {
      title: {
        display: true,
        text: "TVL(in USD)",
      },
      border: {
        display: true,
      },
      grid: {
        display: true,
        drawOnChartArea: true,
        drawTicks: true,
      },
    },
  },
};

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
    <Box display={"flex"} flexDirection={"column"} gap={"30px"}>
    <Flex justifyContent={"space-around"}>
      <AssetSection1 neutronAssets={neutronAssets.assets} cosmosAssets={cosmosAssets.assets} strideAssets={strideAssets.assets} />
    </Flex>
      <AssetGraph/>
    </Box>
  );
};

export default Assets;
