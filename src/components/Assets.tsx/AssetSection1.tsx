import { Box, Flex, Spinner, Text } from "@chakra-ui/react";
import CustomTable from "../DataDisplay/CustomTable";
import Section from "../Layout/Section";
import { useEffect, useState } from "react";
import CustomSkeleton from "../skeleton/CustomSkeleton";
import { assetPieType, assetType } from "../types/types";
import DoughnutChart from "../Graphs and Chart/DoughnutChart";
import AssetGraph from "./AssetGraph";
import AssetOptions from "./AssetOptions";
import DoughnutGraph from "../Graphs and Chart/DoughnutGraph";

type propsType = {
  allAssets: assetType[];
  neutronAssets: assetType[];
  strideAssets: assetType[];
  cosmosAssets: assetType[];
};

const AssetSection1 = ({
  neutronAssets,
  strideAssets,
  cosmosAssets,
  allAssets,
}: propsType) => {
  const getTotalValue = (assets: assetType[]) => {
    return assets.reduce(
      (total: number, asset: assetType) => total + asset.amount,
      0
    );
  };
  const [option, setOption] = useState<assetType[]>(neutronAssets);
  const [finalData, setFinalData] = useState<assetPieType[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("all network");
  useEffect(() => {
    setOption(allAssets);
  }, [allAssets]);

  useEffect(() => {
    // const graphData = {
    //   labels: option.map((asset) => asset.name.label),
    //   datasets: option.map((asset) => asset.amount),
    // };

    let graphData = option.map((item) => {
      return {
        label: item.name.label,
        amount: item.amount
      }
    })

    graphData.sort((a, b) => b.amount - a.amount);

    // Keep the top 2 elements
    let top2 = graphData.slice(0, 2);

    // Calculate the sum of the remaining elements
    let sumOthers = graphData.slice(2).reduce((sum, item) => sum + item.amount, 0);

    // Create a new object for "Others"
    let others = {
      "label": "Others",
      "amount": sumOthers
    };

    // Combine top 2 and others
    let result = [...top2, others];


    setFinalData(result);
  }, [option]);

  const handleChange = (option: string) => {
    if (option === "all network") {
      setOption(allAssets);
      setSelectedOption("all network");
    }
    if (option === "neutron") {
      setOption(neutronAssets);
      setSelectedOption("neutron");
    }
    if (option === "stride") {
      setOption(strideAssets);
      setSelectedOption("stride");
    }
    if (option === "cosmos hub") {
      setOption(cosmosAssets);
      setSelectedOption("cosmos hub");
    }
  };
  return (
    <Flex flexDirection={"column"} gap={"40px"}>
      <AssetOptions
        options={["all network", "neutron", "stride", "cosmos hub"]}
        handleChange={handleChange}
        selectedOption={selectedOption}
      />
      <Flex gap={"40px"} width={"100%"}>
        <Box
          width={"45%"}
          display={"flex"}
          gap={"50px"}
          height={"auto"}
          flex={1}
          backgroundColor={"#17131E"}
          justifyContent={"center"}
          alignItems={"center"}
          flexDirection={"column"}
          borderRadius={"15px"}
        >
          <Section
            height="100%"
            heading={`Assets on ${option === cosmosAssets
              ? " Cosmos Hub"
              : option === neutronAssets
                ? " Neutron"
                : option === allAssets
                  ? "All Network"
                  : " Stride"
              }`}
            subtitle="Stay up to date"
          >
            {option.length ? (
              <CustomTable
                keys={Object.keys(option[0])}
                data={option}
                pagination={true}
                itemsPerPage={5}
                totalValue={getTotalValue(option).toLocaleString()}
              />
            ) : (
              <CustomSkeleton count={5} height="50px" />
            )}
          </Section>
        </Box>

        <Box
          width={"45%"}
          display={"flex"}
          gap={"20px"}
          flex={1}
          // height={"400px"}
          backgroundColor={"#17131E"}
          alignItems={"center"}
          flexDirection={"column"}
          borderRadius={"15px"}
        >
          <Section
            height="100%"
            gap="60px"
            heading={`Total supply on ${option === cosmosAssets
              ? " Cosmos Hub"
              : option === neutronAssets
                ? " Neutron"
                : option === allAssets
                  ? " All Network"
                  : " Stride"
              }`}
            subtitle="A gathering place to address the topics shaping the ATOM Ecosystem"
          >
            {finalData.length > 0 ? (
              <Flex
                flexDirection={"column"}
                maxHeight={"400px"}
                // minW={"75%/"}
                justifyContent={"center"}
                alignItems={"center"}
                gap={"35px"}
              >
                {/* <DoughnutChart data={finalData} /> */}
                <DoughnutGraph doughnutData={finalData} dataKey="amount" labelKey="label" colors={["#fc7779", "#bc3d70", "#fc6c9f"]} />
                <Text fontSize={"14px"}>Asset Supply Distribution on Atom</Text>
              </Flex>
            ) : (
              <Box
                height={"40vh"}
                display={"flex"}
                flexDirection={"column"}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Spinner />
              </Box>
            )}
          </Section>
        </Box>
      </Flex>
      <AssetGraph />
    </Flex>
  );
};

export default AssetSection1;
