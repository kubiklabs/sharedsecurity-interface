/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";
import Section from "../Layout/Section";
import {
  Box,
  Flex,
  Button,
  Text
} from "@chakra-ui/react";
import StatDisplay from "../DataDisplay/StatDisplay";
import { useRecoilState } from "recoil";
import { marketState } from "../../context/marketState";
import FeaturedDataDisplay from "../DataDisplay/FeaturedDataFisplay";
import AreaGraph from "../Graphs and Chart/AreaGraph";


// const data = {
//   labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
//   datasets: [
//     {
//       label: "Transactional Marketing Price",
//       data: [100, 120, 130, 140, 150, 100, 90, 180, 70, 80, 110, 120],
//       backgroundColor: "rgba(75, 192, 192, 0.2)",
//       borderColor: "rgba(75, 192, 192, 1)",
//       borderWidth: 2,
//     },
//   ],
// };

let data: object[] = [];

// Generate 100 rows for each time period with randomized numerical values
let time = "Feb ";
for (let j = 1; j <= 100; j++) {
  let entry = {
    "time": time + j,
    transactions: Math.floor(Math.random() * 10), ibcTransactions: Math.floor(Math.random() * 10), activeAccounts: Math.floor(Math.random() * 10), totalProposals: Math.floor(Math.random() * 10), stakedAccounts: Math.floor(Math.random() * 10)
  };
  data.push(entry);
}


// const data = [
//   { month: "Jan", transactions: 100, ibcTransactions: 500, activeAccounts: 1000, totalProposals: 1000, stakedAccounts: 1000 },
//   { month: "Feb", transactions: 120, ibcTransactions: 400, activeAccounts: 900, totalProposals: 900, stakedAccounts: 900 },
//   { month: "Mar", transactions: 130, ibcTransactions: 300, activeAccounts: 800, totalProposals: 800, stakedAccounts: 800 },
//   { month: "Apr", transactions: 140, ibcTransactions: 200, activeAccounts: 700, totalProposals: 700, stakedAccounts: 700 },
//   { month: "May", transactions: 150, ibcTransactions: 100, activeAccounts: 600, totalProposals: 600, stakedAccounts: 600 },
//   { month: "Jun", transactions: 100, ibcTransactions: 90, activeAccounts: 500, totalProposals: 500, stakedAccounts: 500 },
//   { month: "Jul", transactions: 90, ibcTransactions: 80, activeAccounts: 400, totalProposals: 900, stakedAccounts: 200 },
//   { month: "Aug", transactions: 180, ibcTransactions: 70, activeAccounts: 700, totalProposals: 200, stakedAccounts: 900 },
//   { month: "Sep", transactions: 70, ibcTransactions: 60, activeAccounts: 500, totalProposals: 500, stakedAccounts: 100 },
//   { month: "Oct", transactions: 80, ibcTransactions: 50, activeAccounts: 300, totalProposals: 600, stakedAccounts: 800 },
//   { month: "Nov", transactions: 110, ibcTransactions: 40, activeAccounts: 600, totalProposals: 200, stakedAccounts: 300 },
//   { month: "Dec", transactions: 120, ibcTransactions: 30, activeAccounts: 480, totalProposals: 100, stakedAccounts: 900 },
// ];


const buttonSelectorData = [
  { label: "Transactions", value: "7,584", identifier: "transactions" },
  { label: "IBC Transactions", value: "7,584", identifier: "ibcTransactions" },
  { label: "Active Accounts", value: "17,284", identifier: "activeAccounts" },
  { label: "Total Proposals", value: "211", identifier: "totalProposals" },
  { label: "Staked Amount", value: "211", identifier: "stakedAccounts" },
]

const colorSelectorObject = {
  transactions: "#BC3D70",
  ibcTransactions: "#fcba03",
  activeAccounts: "#FAA291",
  totalProposals: "#c720c9",
  stakedAccounts: "#941f2f",
}


// const options = {
//   responsive: true,
//   // aspectRatio: 1, 
//   maintainAspectRatio: false,
//   plugins: {
//     customCanvasBackgroundColor: {
//       color: "lightGreen",
//     },
//     colors: {
//       forceOverride: true,
//     },
//     legend: {
//       display: false,
//     },
//     decimation: {
//       enabled: true,
//       sample: 50,
//     },
//   },
//   scales: {
//     x: {
//       border: {
//         display: true,
//         color: "#000",
//       },
//       grid: {
//         display: true,
//         drawOnChartArea: true,
//         drawTicks: true,
//         color: "#272525",
//       },
//     },
//     y: {
//       border: {
//         display: true,
//         color: "#000",
//       },
//       grid: {
//         display: true,
//         drawOnChartArea: true,
//         drawTicks: true,
//         color: "#272525",
//       },
//     },
//   },
// };
const numberWithCommas = (value: number) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
const Featured = ({ stats }: { stats: Array<any> }) => {
  const [totalMarketCap, setTotalMarketCap] = useState("-");
  const [{ Cosmos, Neutron, Stride }, setMarketState] = useRecoilState(marketState);
  const [chartData, setChartData] = useState(data);
  const [selectedOption, setSelectedOption] = useState({
    transactions: true,
    ibcTransactions: false,
    activeAccounts: true,
    totalProposals: false,
    stakedAccounts: false,
  });

  const [showLine, setShowLine] = useState<string[]>([]);
  const [color, setColor] = useState<string[]>([]);

  useEffect(() => {
    const newShowLine: string[] = [];
    const newColor: string[] = [];
    Object.keys(selectedOption).map((item) => {
      if (selectedOption[item as keyof typeof selectedOption]) {
        newShowLine.push(item);
        newColor.push(colorSelectorObject[item as keyof typeof selectedOption]);
      }
    });
    setShowLine(newShowLine);
    setColor(newColor);
  }, [selectedOption]);


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
      <Box width={"100%"} position={"relative"} display={"flex"} flexDirection={"column"} gap={"30px"}>
        {/* <Flex gap={"4px"} alignItems={"flex-end"} position={"absolute"} top={20} right={30} borderRadius={"10px"} border={"1px solid rgba(188, 61, 112, 1)"}>
            <StatDisplay label={numberWithCommas(stats[0].label)} number={stats[0].number} bg="transparent"/>
        </Flex> */}
        <Box width={"100%"} height={"60vh"}>
          {/* <Line data={data} options={options} /> */}
          <AreaGraph lineData={data} colors={color} xKey={"time"} yKey={showLine} />
        </Box>
        <Flex width={"100%"} justifyContent={"space-around"}>
          {
            buttonSelectorData.map((item, index) => (
              <Box
                key={index}
                display={"flex"}
                flexDir={"row"}
                justifyContent={"center"}
                gap={"8px"}
                alignItems="center"
                paddingX={"24px"}
                paddingY={"12px"}
                cursor={"pointer"}
                _hover={{ textDecor: "none", borderColor: colorSelectorObject[item.identifier as keyof typeof selectedOption] }}
                borderRadius="5px"
                fontSize="12px"
                fontWeight={400}
                borderWidth={"1px"}
                borderColor={(selectedOption[item.identifier as keyof typeof selectedOption]) ? colorSelectorObject[item.identifier as keyof typeof selectedOption] : "transparent"}
                onClick={() => {
                  if ((selectedOption[item.identifier as keyof typeof selectedOption] && showLine.length > 1) || !selectedOption[item.identifier as keyof typeof selectedOption]) {
                    setSelectedOption({ ...selectedOption, [item.identifier]: !selectedOption[item.identifier as keyof typeof selectedOption] })
                  }
                }}
                bgColor={"transparent"}
              >
                <Text fontSize={"20px"} textColor={"#D9D9D9"}>{item.value}</Text>
                <Text fontSize={"14px"} textColor={"#B3B3B3"}>{item.label}</Text>
              </Box>
            ))
          }
          {/* {stats.map((item)=>(
          item.label!="Transaction Monitoring"&&<FeaturedDataDisplay key={item.label} text={item.label} value={item.label==="Total Market Cap"?`$ ${totalMarketCap}`:item.number}/>
        ))} */}
        </Flex>
      </Box>
    </Section>
  );
};

export default Featured;
