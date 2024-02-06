import { Box, Flex, Heading, Select, Spinner, Text } from "@chakra-ui/react";
import CustomTable from "../DataDisplay/CustomTable";
import Section from "../Layout/Section";
import { useEffect, useState } from "react";
import CustomSkeleton from "../skeleton/CustomSkeleton";
import { assetPieType, assetType } from "../types/types";
import DoughnutChart from "../Graphs and Chart/DoughnutChart";


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
  // const chartOption={
  //   legend: {
  //     display: true,
  //     position: "right",
  //   },
  // }
  return (
    <Flex justifyContent={"space-between"} width={"100%"}>

      <Box
        width={"45%"}
        display={"flex"}
        gap={"20px"}
        backgroundColor={"#17131E"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
        height={"auto"}
        borderRadius={"15px"}
      >
        <Section>
          <Flex justifyContent={"space-between"}>
            <Flex flexDirection={"column"} alignItems={"flex-start"} justifyContent={"flex-start"}>
            <Heading size={"24px"}>Assets on {option === cosmosAssets ? " Cosmos Hub" : option === neutronAssets ? " Neutron" : " Stride"} </Heading>
            <Text color={"gray"} fontSize={"14px"}>Stay up to date</Text>
            </Flex>
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
            // <Flex justifyContent={"center"} alignItems={"center"} width={"100%"} height={"90%"}>
              <CustomTable
                keys={Object.keys(option[0])}
                data={option}
                pagination={true}
                itemsPerPage={5}
                totalValue={getTotalValue(option).toLocaleString()}
              />
            // </Flex>
          ) : (
            
            <CustomSkeleton count={5} height="50px" />
          )}
        </Section>
      </Box>

      <Box
        width={"45%"}
        display={"flex"}
        gap={"20px"}
        backgroundColor={"#17131E"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
        height={"auto"}
        borderRadius={"15px"}
      >
        <Section heading={`Total supply on ${option === cosmosAssets ? " Cosmos Hub" : option === neutronAssets ? " Neutron" : " Stride"}`}
        subtitle="A gathering place to address the topics shaping the ATOM Ecosystem"
        >

        {finalData && finalData.labels.length > 0 ?
        <Flex flexDirection={"column"} minWidth={"80%"} margin={"auto"} height={"auto"} justifyContent={"space-around"} gap={"10px"} >
          <DoughnutChart data={finalData} />
          <Text fontSize={"14px"}>Asset Supply Distribution on Atom</Text>
        </Flex>
        :
          <Box height={"40vh"} display={"flex"} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
            <Spinner />
          </Box>
        }
        </Section>
      </Box>
    </Flex>
  );
};

export default AssetSection1;
