/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";
import { useChainMarketInfo } from "../../hooks/useChainMarketInfo";
import { SimpleGrid, Stack } from "@chakra-ui/react";
import AreaGraphCard from "./AreaGraphCard";
import homeLinesAndGraphPrice from "../../config/homeLinesAndGraphsPrice.json";
import homeLinesAndGraphsCirculatingSupply from "../../config/homeLinesAndGraphsCirculatingSupply.json";
import homeLinesAndGraphsAPY from "../../config/homeLinesAndGraphsAPY.json";
import homeLinesAndGraphsMarketCap from "../../config/homeLinesAndGraphsMarketCap.json";
import AssetOptions from "../Assets/AssetOptions";


const Trends = () => {
  const { getHistoricalPrice } = useChainMarketInfo();
  const [finalCosmosData, setFinalCosmosData] = useState<any>();
  const [finalStrideData, setFinalStrideData] = useState<any>();
  const [finalNeutronData, setFinalNeutronData] = useState<any>();
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    let cosmosTrend = await getHistoricalPrice("Cosmos");
    let strideTrend = await getHistoricalPrice("Stride");
    const neutronTrend = await getHistoricalPrice("Neutron");

    const maxLength = neutronTrend.labels.length;
    const strideData = strideTrend.data.data;
    const cosmosData = cosmosTrend.data.data;

    strideTrend = {
      ...strideTrend,
      data: {
        ...strideTrend.data,
        data: strideData.slice(
          strideData.length - maxLength,
          strideData.length
        ),
      },
    };

    cosmosTrend = {
      ...cosmosTrend,
      data: {
        ...cosmosTrend.data,
        data: cosmosData.slice(
          cosmosData.length - maxLength,
          cosmosData.length
        ),
      },
    };
    const cosmosGraphData = {
      labels: neutronTrend.labels,
      datasets: [cosmosTrend.data],
    };
    const neutronGraphData = {
      labels: neutronTrend.labels,
      datasets: [neutronTrend.data],
    };
    const strideGraphData = {
      labels: neutronTrend.labels,
      datasets: [strideTrend.data],
    };
    setFinalCosmosData(cosmosGraphData);
    setFinalNeutronData(neutronGraphData);
    setFinalStrideData(strideGraphData);
  };

  const [selectedOption, setOption] = useState<any>(finalNeutronData);
  const [finalData, setFinalData] = useState<any>(selectedOption);
  const [length, setLength] = useState<number>(0);

  useEffect(() => {
    setOption(finalNeutronData);
  }, [finalNeutronData]);
  useEffect(() => {
    console.log(selectedOption);
    setFinalData(selectedOption);
  }, [selectedOption]);

  const [selectedDateFilter, setDateFilter] = useState<string>();

  const handleDateFilterChange = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    item: string
  ) => {
    setDateFilter(item);
    let updatedOption: any = {};
    const dataInRange = (start: number, end: number) => ({
      labels: selectedOption.labels.slice(start, end + 1),
      datasets: [
        {
          ...selectedOption.datasets[0],
          data: selectedOption.datasets[0].data.slice(start, end + 1),
        },
      ],
    });
    const len = selectedOption.labels.length;
    switch (item) {
      case "24 Hours":
        updatedOption = dataInRange(len - 2, len - 1);
        break;
      case "7 Days":
        updatedOption = dataInRange(len - 8, len - 1);
        break;
      case "30 Days":
        updatedOption = dataInRange(len - 31, len - 1);
        break;
      case "All Time":
        updatedOption = dataInRange(0, selectedOption.labels.length);
        break;
      default:
        updatedOption = dataInRange(0, -1);
    }

    setFinalData(updatedOption);
  };

  const [selectedChain, setSelectedChain] = useState<string>("All Network");

  const handleChange = (option: string) => {
    setSelectedChain(option);
  };

  return (
    <Stack gap={"50px"}>
      <AssetOptions
        options={["All Network", "Cosmos Hub", "Stride", "Neutron"]}
        handleChange={handleChange}
        selectedOption={selectedChain}
      />
      <SimpleGrid columns={2} row={2} gap={"20px"}>
        {
          <AreaGraphCard
            title="Price"
            subTitle="$10.02"
            objData={
              homeLinesAndGraphPrice[
                selectedChain as keyof typeof homeLinesAndGraphPrice
              ]
            }
            selectedChain={selectedChain}
          />
        }
        {
          <AreaGraphCard
            title="APY"
            subTitle="$10.02"
            objData={
              homeLinesAndGraphsAPY[
                selectedChain as keyof typeof homeLinesAndGraphsAPY
              ]
            }
            selectedChain={selectedChain}
          />
        }
        {
          <AreaGraphCard
            title="Market Cap"
            subTitle="$10.02"
            objData={
              homeLinesAndGraphsMarketCap[
                selectedChain as keyof typeof homeLinesAndGraphsMarketCap
              ]
            }
            selectedChain={selectedChain}
          />
        }
        {
          <AreaGraphCard
            title="Circulating Supply"
            subTitle="$10.02"
            objData={
              homeLinesAndGraphsCirculatingSupply[
                selectedChain as keyof typeof homeLinesAndGraphsCirculatingSupply
              ]
            }
            selectedChain={selectedChain}
          />
        }
      </SimpleGrid>
    </Stack>
  );
};

export default Trends;
