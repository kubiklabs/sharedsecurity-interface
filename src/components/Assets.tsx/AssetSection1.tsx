import { Box, Flex, Heading, Select, Spinner } from "@chakra-ui/react";
import CustomTable from "../DataDisplay/CustomTable";
import Section from "../Layout/Section";
import { useEffect, useState } from "react";
import CustomSkeleton from "../skeleton/CustomSkeleton";
import { assetPieType, assetType } from "../types/types";
import DoughnutChart from "../Graphs and Chart/DoughnutChart";



// export const options = {
//   responsive: true,
//   plugins: {
//     customCanvasBackgroundColor: {
//       color: "lightGreen",
//     },
//     colors: {
//       forceOverride: true,
//     },
//     legend: {
//       position: "top" as const,
//     },
//     title: {
//       display: true,
//       text: "Chains",
//     },
//     decimation: {
//       enabled: true,
//       algoritghm: "min-max",
//       sample: 50,
//     },
//   },
//   scales: {
//     x: {
//       title: {
//         display: true,
//         text: "Date",
//       },
//       border: {
//         display: true,
//       },
//       grid: {
//         display: true,
//         drawOnChartArea: true,
//         drawTicks: true,
//         color: "#000",
//       },
//     },
//     y: {
//       title: {
//         display: true,
//         text: "TVL(in USD)",
//       },
//       border: {
//         display: true,
//       },
//       grid: {
//         display: true,
//         drawOnChartArea: true,
//         drawTicks: true,
//       },
//     },
//   },
// };


type propsType = {
  neutronAssets: assetType[],
  strideAssets: assetType[],
  cosmosAssets: assetType[]
}


const AssetSection1 = ({ neutronAssets, strideAssets, cosmosAssets }: propsType) => {
  console.log(neutronAssets)
  const getTotalValue = (assets: assetType[]) => {
    return assets.reduce((total: number, asset: assetType) => total + asset.amount, 0);
  };
  const [option, setOption] = useState<assetType[]>(neutronAssets)
  const [finalData, setFinalData] = useState<assetPieType>();
  useEffect(() => {
    // Update the option state when props change
    setOption(neutronAssets);
  }, [neutronAssets]);

  useEffect(() => {
    //update the graph data when option is changed
    const graphData = {
      labels: option.map((asset) => asset.name.label),
      datasets: option.map((asset) => asset.amount),
    };
    console.log("graph data", graphData)
    setFinalData(graphData);
  }, [option]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const option = e.target.value;
    if (option === "neutron") {
      setOption(neutronAssets)
    }
    if (option === "stride") {
      setOption(strideAssets)
    }
    if (option === "cosmos") {
      setOption(cosmosAssets)
    }
  }
  return (
    <Flex justifyContent={"space-around"} width={"100%"}>

      <Box
        width={"40%"}
        display={"flex"}
        gap={"20px"}
        backgroundColor={"#17131E"}
        justifyContent={"center"}
        // alignItems={"stretch"}
        flexDirection={"column"}
        height={"auto"}
        padding={"10px 20px"}
        borderRadius={"15px"}
      >
        <Section>
          <Flex justifyContent={"space-between"}>
            <Heading>Assets on {option === cosmosAssets ? " Cosmos Hub" : option === neutronAssets ? " Neutron" : " Stride"} </Heading>
            <Select
              onChange={handleChange}
              size="lg"
              minW={"100px"}
              width={"fit-content"}
            >
              <option value="neutron">Neutron</option>
              <option value="stride">Stride</option>
              <option value="cosmos">Cosmos Hub</option>
            </Select>
          </Flex>
          {option.length ? (
            <Flex justifyContent={"center"}>
              <CustomTable
                keys={Object.keys(option[0])}
                data={option}
                pagination={true}
                itemsPerPage={5}
                totalValue={getTotalValue(option).toLocaleString()}
              />
            </Flex>
          ) : (
            <CustomSkeleton count={5} height="50px" />
          )}
        </Section>
      </Box>

      <Box
        width={"40%"}
        display={"flex"}
        gap={"20px"}
        backgroundColor={"#17131E"}
        justifyContent={"center"}
        flexDirection={"column"}
        height={"auto"}
        padding={"10px 20px"}
        borderRadius={"15px"}
      >
            <Heading>Total supply on {option === cosmosAssets ? " Cosmos Hub" : option === neutronAssets ? " Neutron" : " Stride"} </Heading>
            {finalData && finalData.labels.length>0 && <DoughnutChart data={finalData} />}
          {option.length ? (
            <>
            </>
          ) : (
            <Box height={"90%"} display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
            <Spinner/>
            </Box>
          )}
      </Box>
    </Flex>
  );
};

export default AssetSection1;
