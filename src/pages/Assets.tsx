import { Box, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
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
import { Pie } from "react-chartjs-2";

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

  const [finalData, setFinalData] = useState<any>();

  useEffect(() => {
    getSupply();
  }, []);

  useEffect(() => {
    const graphData = {
      labels: strideAssets.assets.map((asset) => asset.name.label),
      datasets: strideAssets.assets.map((asset) => asset.amount),
    };
    setFinalData(graphData);
  }, [strideAssets]);
  // console.log(strideAssets, cosmosAssets, neutronAssets);

  const getSupply = async () => {
    if (!strideAssets.assets.length) getParsedStrideAssets();
    if (!cosmosAssets.assets.length) getParsedCosmosAssets();
    if (!neutronAssets.assets.length) getParsedNeutronAssets();
    const graphData = {
      labels: strideAssets.assets.map((asset) => asset.name.label),
      datasets: strideAssets.assets.map((asset) => asset.amount),
    };
    setFinalData(graphData);
  };
  const getTotalValue = (assets:any) => {
    return assets.reduce((total:number, asset:any) => total + asset.amount, 0);
  };

  return (
    <Box>
      <Box
        width={"100%"}
        justifyContent={"space-between"}
        display={"flex"}
        gap={"20px"}
      >
        <Section heading="Neutron">
          {neutronAssets.assets.length ? (
              <>
              <CustomTable
                keys={Object.keys(neutronAssets?.assets[0])}
                data={neutronAssets?.assets}
                pagination={true}
                itemsPerPage={5}
                totalValue={getTotalValue(neutronAssets.assets).toLocaleString()}
              />
            </>
          ) : (
            <CustomSkeleton count={5} height="50px" />
          )}
        </Section>
        <Section heading="Stride">
          {strideAssets.assets.length ? (
            <>
            <CustomTable
              keys={Object.keys(strideAssets?.assets[0])}
              data={strideAssets?.assets}
              pagination={true}
              itemsPerPage={5}
              totalValue={getTotalValue(strideAssets.assets).toLocaleString()}
            />
          </>
          ) : (
            <CustomSkeleton count={5} height="50px" />
          )}
        </Section>
        <Section heading="Cosmos">
          {cosmosAssets.assets.length ? (
           <>
           <CustomTable
             keys={Object.keys(cosmosAssets?.assets[0])}
             data={cosmosAssets?.assets}
             totalValue={getTotalValue(cosmosAssets.assets).toLocaleString()}
           />
         </>
          ) : (
            <CustomSkeleton count={5} height="50px" />
          )}
        </Section>
      </Box>
      {/* {strideAssets.assets.length && <Pie data={finalData} options={options} />} */}
    </Box>
  );
};

export default Assets;
