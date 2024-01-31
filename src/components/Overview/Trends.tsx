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
import { Box, Flex, Select, Text } from "@chakra-ui/react";

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

const filters = [
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
      display: false,
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

const Trends = () => {
  const { getHistoricalPrice } = useChainMarketInfo();
  const [finalCosmosData, setFinalCosmosData] = useState<any>();
  const [finalStrideData, setFinalStrideData] = useState<any>();
  const [finalNeutronData, setFinalNeutronData] = useState<any>();
  // const [finalLabels, setFinalLabels] = useState(labels);
  useEffect(() => {
    getData();
  });
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

  const [selectedOption, setOption] = useState()
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const option = e.target.value;
    if (option === "neutron") {
      setOption(finalNeutronData)
    }
    if (option === "stride") {
      setOption(finalStrideData)
    }
    if (option === "cosmos") {
      setOption(finalCosmosData)
    }
  }
  useEffect(() => {
    setOption(finalNeutronData);
  }, [finalNeutronData]);

  const [selectedFilter, setFilter] = useState<string>("All time")
  const handleFilterChange = (e: React.MouseEvent<HTMLDivElement, MouseEvent>,item:string) => {
    setFilter(item);
    console.log(selectedOption)
    if(item==="24 Hours"){
      setOption(selectedOption![-1])
    }
  }
  // useEffect(() => {
  //   setFilter(finalNeutronData);
  // }, [finalNeutronData]);
  return (
    <Section heading="Stats and Graphs" subtitle="You might find it interesting">
      <Flex justifyContent={"space-between"} paddingX={"20px"}>
        <Flex border={"1px solid rgba(57, 56, 60, 0.6)"} borderRadius={"5px"} alignItems={"center"} px={"5px"}>
        {filters.map((item) => ((
          <Box
            cursor={"pointer"}
            width={"fit-content"}
            onClick={(e) => handleFilterChange(e,item.label)}
            backgroundColor={
              selectedFilter===item.label
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
      {selectedOption ? (
        <Line data={selectedOption} options={options} />
      ) : (
        <CustomSkeleton count={1} height="500px" />
      )}
    </Section>
  );
};

export default Trends;
