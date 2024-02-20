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
      (total: number, asset: assetType) => total + asset?.value,
      0
    );
  };
  const [option, setOption] = useState<assetType[]>(neutronAssets);
  const [finalData, setFinalData] = useState<assetPieType[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("all network");

  const [combinedAllAssets, setCombinedAllAssets] =
    useState<assetType[]>(allAssets);

  useEffect(() => {
    let combinedData: { [key: string]: assetType } = {};

    // Combining data and summing up amounts
    allAssets.forEach((item) => {
      let label = item.name.label;
      if (!combinedData[label]) {
        combinedData[label] = { ...item };
      } else {
        combinedData[label].total_supply += item.total_supply;
      }
    });

    // Converting combinedData object to an array
    setCombinedAllAssets(Object.values(combinedData));
  }, [allAssets]);

  useEffect(() => {
    setOption(combinedAllAssets);
  }, [combinedAllAssets]);

  useEffect(() => {
    // const graphData = {
    //   labels: option.map((asset) => asset.name.label),
    //   datasets: option.map((asset) => asset.amount),
    // };

    let numberOfDataInDoughnut = 4;

    let graphData = option.map((item) => {
      return {
        label: item.name.label,
        amount: item.total_supply,
      };
    });

    graphData.sort((a, b) => b.amount - a.amount);

    let topData = graphData.slice(0, numberOfDataInDoughnut - 1);

    let sumOthers = graphData
      .slice(numberOfDataInDoughnut - 1)
      .reduce((sum, item) => sum + item.amount, 0);


    let result = [...topData];

    if (sumOthers !== 0) {
      let others = {
        label: "Others",
        amount: sumOthers,
      };

      result = [...result, others];
    }

    setFinalData(result);
  }, [option]);
  console.log(option);

  const calculateTotalAmount = (data: any) => {
    return data.reduce(
      (total: number, item: assetType) => total + item.total_supply,
      0
    );
  };

  /*  console.log("Total amount:", calculateTotalAmount(option));
  console.log("Total value:", getTotalValue(option)); */

  const handleChange = (option: string) => {
    if (option === "all network") {
      setOption(combinedAllAssets);
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
                  : option === combinedAllAssets
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
                totalValue={getTotalValue(option)}
                totalAmount={calculateTotalAmount(option)
                  .toFixed(2)
                  .toLocaleString()}
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
                  : option === combinedAllAssets
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
                <DoughnutGraph
                  doughnutData={finalData}
                  dataKey="amount"
                  labelKey="label"
                  colors={[
                    "#fc7779",
                    "#bc3d70",
                    "#fc6c9f",
                    "#fc67c5",
                    "#95004b",
                    "#dd006d",
                  ]}
                />
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
