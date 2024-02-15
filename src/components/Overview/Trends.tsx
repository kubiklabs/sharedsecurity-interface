import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Colors,
  Decimation,
} from "chart.js";
import { } from "chart.js/helpers";
import { Line } from "react-chartjs-2";
import Section from "../Layout/Section";
import { useChainMarketInfo } from "../../hooks/useChainMarketInfo";
import CustomSkeleton from "../skeleton/CustomSkeleton";
import { Box, Flex, Select, SimpleGrid, Text } from "@chakra-ui/react";
import ChainSelector from "./ChainSelector";
import AreaGraph from "../Graphs and Chart/AreaGraph";
import AreaGraphCard from "./AreaGraphCard";
import homeLinesAndGraphPrice from '../../config/homeLinesAndGraphsPrice.json'
import homeLinesAndGraphsCirculatingSupply from '../../config/homeLinesAndGraphsCirculatingSupply.json'
import homeLinesAndGraphsAPY from '../../config/homeLinesAndGraphsAPY.json'
import homeLinesAndGraphsMarketCap from '../../config/homeLinesAndGraphsMarketCap.json'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Colors,
  Decimation
);

const dateFilters = [
  {
    label: "24 Hours"
  },
  {
    label: "7 Days"
  },
  {
    label: "30 Days"
  },
  {
    label: "All Time"
  },
]
const otherfilters = [
  {
    label: "price"
  },
  {
    label: "apy"
  },
  {
    label: "inflation"
  },
  {
    label: "market cap"
  },
  {
    label: "staked amount"
  },
  {
    label: "supply blocks"
  },
  {
    label: "transactions"
  },
  {
    label: "volume"
  },
]
export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    customCanvasBackgroundColor: {
      color: "lightGreen",
    },
    colors: {
      forceOverride: true,
    },
    legend: {
      display: false,
    },
    decimation: {
      enabled: true,
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
        color: "#000",
      },
      grid: {
        display: true,
        drawOnChartArea: true,
        drawTicks: true,
        color: "#272525",
      },
    },
    y: {
      title: {
        display: true,
        text: "TVL(in USD)",
      },
      border: {
        display: true,
        color: "#000",
      },
      grid: {
        display: true,
        drawOnChartArea: true,
        drawTicks: true,
        color: "#272525",
      },
    },
  },
};


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
  const [finalData, setFinalData] = useState<any>(selectedOption)
  const [length, setLength] = useState<number>(0)
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const item = e.target.value;
    if (item === "neutron") {
      setOption(finalNeutronData)
    }
    if (item === "stride") {
      setOption(finalStrideData)
    }
    if (item === "cosmos") {
      setOption(finalCosmosData)
    }
    setLength(selectedOption.labels[0].length)
    console.log(selectedOption.labels.length)
  }
  useEffect(() => {
    setOption(finalNeutronData);
  }, [finalNeutronData]);
  useEffect(() => {
    console.log(selectedOption);
    setFinalData(selectedOption);
  }, [selectedOption]);

  const [selectedDateFilter, setDateFilter] = useState<string>()


  const handleDateFilterChange = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, item: string) => {
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
    const len = selectedOption.labels.length
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
        updatedOption = dataInRange(0, - 1);
    }

    setFinalData(updatedOption);
  };


  const [selectedOtherFilter, setOtherFilter] = useState<string>("Cosmos Hub")
  const handleOtherFilterChange = (e: React.MouseEvent<HTMLDivElement, MouseEvent>, item: string) => {
    setOtherFilter(item);
  }

  const [selectedChain, setSelectedChain] = useState<string>("All Network");

  return (
    <>
      <ChainSelector selectedChain={selectedChain} setSelectedChain={setSelectedChain} />

      <SimpleGrid columns={2} row={2} gap={"20px"}>
        {<AreaGraphCard title="Price" subTitle="$10.02" objData={homeLinesAndGraphPrice[selectedChain as keyof typeof homeLinesAndGraphPrice]} selectedChain={selectedChain} />}
        {<AreaGraphCard title="APY" subTitle="$10.02" objData={homeLinesAndGraphsAPY[selectedChain as keyof typeof homeLinesAndGraphsAPY]} selectedChain={selectedChain} />}
        {<AreaGraphCard title="Market Cap" subTitle="$10.02" objData={homeLinesAndGraphsMarketCap[selectedChain as keyof typeof homeLinesAndGraphsMarketCap]} selectedChain={selectedChain} />}
        {<AreaGraphCard title="Circulating Supply" subTitle="$10.02" objData={homeLinesAndGraphsCirculatingSupply[selectedChain as keyof typeof homeLinesAndGraphsCirculatingSupply]} selectedChain={selectedChain} />}
      </SimpleGrid>

      {/* <Section heading="Stats and Graphs" subtitle="You might find it interesting">
      <Box position={"relative"}>
        <Flex justifyContent={"space-between"} paddingX={"20px"} position={"absolute"} top={10} right={50} left={100} >
          <Flex border={"1px solid rgba(57, 56, 60, 0.6)"} borderRadius={"5px"} alignItems={"center"} px={"5px"}>
            {dateFilters.map((item) => ((
              <Box
                cursor={"pointer"}
                width={"fit-content"}
                onClick={(e) => handleDateFilterChange(e, item.label)}
                backgroundColor={
                  selectedDateFilter === item.label
                    ? "#2d2a2b"
                    : "transparent"
                }
                borderRadius={"5px"}
                padding={"5px 10px"}
                key={item.label}
              >
                <Text>{item.label}</Text>
              </Box>
            )))}
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
        {finalData ? (
          <Box width={"100%"} height={"80vh"}>
            <Line data={finalData} options={options} />
            <AreaGraph lineData={finalData} color="#ffffff"/>
          </Box>
        ) : (
          <CustomSkeleton count={1} height="500px" />
        )}
      </Box>
      <Flex alignItems={"center"} px={"5px"} gap={"6px"}>
        {otherfilters.map((item) => ((
          <Box
            cursor={"pointer"}
            width={"fit-content"}
            onClick={(e) => handleOtherFilterChange(e, item.label)}
            backgroundColor={
              selectedOtherFilter === item.label
                ? "#2d2a2b"
                : "transparent"
            }
            borderRadius={"5px"}
            padding={"5px 10px"}
            key={item.label}
            border={"1px solid rgba(57, 56, 60, 0.6)"}
          >
            <Text>{item.label}</Text>
          </Box>
        )))}
      </Flex>
    </Section> */}
      {/* <AreaGraphCard/> */}
    </>
  );
};

export default Trends;
