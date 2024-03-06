import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import Section from "../Layout/Section";
import { Box,Flex, Text } from "@chakra-ui/react";
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

// const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       customCanvasBackgroundColor: {
//         color: "lightGreen",
//       },
//       colors: {
//         forceOverride: true,
//       },
//       legend: {
//         display: false,
//       },
//       decimation: {
//         enabled: true,
//         sample: 50,
//       },
//     },
//     scales: {
//       x: {
//         border: {
//           display: true,
//           color: "#000",
//         },
//         grid: {
//           display: true,
//           drawOnChartArea: true,
//           drawTicks: true,
//           color: "#272525",
//         },
//       },
//       y: {
//         border: {
//           display: true,
//           color: "#000",
//         },
//         grid: {
//           display: true,
//           drawOnChartArea: true,
//           drawTicks: true,
//           color: "#272525",
//         },
//       },
//     },
//   };

// For generating random data
let data: object[] = [];

let time = "Feb ";
for (let j = 1; j <= 10; j++) {
  let entry = {
    "time": time + j,
    totalSupply: Math.floor(Math.random() * 10), ibcIn: Math.floor(Math.random() * 10), ibcOut: Math.floor(Math.random() * 10)
  };
  data.push(entry);
}




// const data = [
//   { month: "Jan", value1: 100, value2: 500 },
//   { month: "Feb", value1: 120, value2: 400},
//   { month: "Mar", value1: 130, value2: 300},
//   { month: "Apr", value1: 140, value2: 200},
//   { month: "May", value1: 150, value2: 100},
//   { month: "Jun", value1: 100, value2: 90},
//   { month: "Jul", value1: 90 , value2: 80},
//   { month: "Aug", value1: 180, value2: 70},
//   { month: "Sep", value1: 70, value2: 60},
//   { month: "Oct", value1: 80, value2: 50},
//   { month: "Nov", value1: 110, value2: 40},
//   { month: "Dec", value1: 120, value2: 30},
// ];



const buttonSelectorData = [
  { label: "Total Supply", value: "7,584", identifier: "totalSupply" },
  { label: "IBC In", value: "7,584", identifier: "ibcIn" },
  { label: "IBC Out", value: "17,284", identifier: "ibcOut" },
]

const colorSelectorObject = {
  totalSupply: "#BC3D70",
  ibcIn: "#fcba03",
  ibcOut: "#FAA291",
}



const AssetGraph = () => {

  const [selectedOption, setSelectedOption] = useState({
    totalSupply: true,
    ibcIn: false,
    ibcOut: false,
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


  return (
    <Section heading="Total Supply" subtitle="Our top picks to get you started" >
      <Box position={"relative"} width={"100%"} height={"60vh"}>
        {/* <Line data={data} options={options} /> */}
        <AreaGraph lineData={data} colors={color} xKey={"time"} yKey={showLine} />
      </Box>

      <Flex width={"100%"} justifyContent={"space-around"}>
          {
            buttonSelectorData.map((item) => (
              <Box
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


    </Section>
  );
}

export default AssetGraph;
