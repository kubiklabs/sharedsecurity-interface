import React, { useEffect, useState } from "react";
import Section from "../Layout/Section";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
} from "@chakra-ui/react";
import StatDisplay from "../DataDisplay/StatDisplay";
import { useRecoilState } from "recoil";
import { marketState } from "../../context/marketState";
import { Line } from "react-chartjs-2";
import FeaturedDataDisplay from "../DataDisplay/FeaturedDataFisplay";


const data = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
  datasets: [
    {
      label: "Transactional Marketing Price",
      data: [100, 120, 130, 140, 150, 100, 90, 180, 70, 80, 110, 120],
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 2,
    },
  ],
};
const options = {
  responsive: true,
  // aspectRatio: 0, 
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
      // algorithm: "min-max",
      sample: 50,
    },
  },
  scales: {
    x: {
      // title: {
      //   display: true,
      //   text: "Date",
      // },
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
      // title: {
      //   display: true,
      //   text: "TVL(in USD)",
      // },
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
const numberWithCommas = (value: number) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
const Featured = ({ stats }: { stats: Array<any> }) => {
  const [totalMarketCap, setTotalMarketCap] = useState("-");
  const [{ Cosmos, Neutron, Stride }, setMarketState] = useRecoilState(marketState);
    const [chartData, setChartData] = useState(data);

  const calculateTotalMarketCap = () => {
    let totalMarketCap = 0;
    console.log(Cosmos);

    if (Cosmos) {
      console.log(Cosmos.market_cap);

      totalMarketCap =
        Number(Cosmos.market_cap) +
        Number(Neutron?.market_cap) +
        Number(Stride?.market_cap);
    }
    setTotalMarketCap(totalMarketCap.toLocaleString());
    return totalMarketCap.toLocaleString();
  };
  useEffect(() => {
    calculateTotalMarketCap()
  }, []);
  return (
    <Section heading="Featured" subtitle="Our top picks to get you started">
      <Box position={"relative"} display={"flex"} flexDirection={"column"} gap={"30px"}>
      <Flex gap={"4px"} alignItems={"flex-end"} position={"absolute"} top={20} right={30} borderRadius={"10px"} border={"1px solid rgba(188, 61, 112, 1)"}>
            <StatDisplay label={stats[0].label} number={stats[0].number} bg="transparent"/>
        </Flex>
        <Line data={chartData} options={options} />
        <Flex width={"100%"} justifyContent={"space-around"}>
        {stats.map((item)=>(
          item.label!="Transaction Monitoring"&&<FeaturedDataDisplay key={item.label} text={item.label} value={item.label==="Total Market Cap"?`$ ${totalMarketCap}`:item.number}/>
        ))}
        </Flex>
        </Box>
    </Section>
  );
};

export default Featured;
