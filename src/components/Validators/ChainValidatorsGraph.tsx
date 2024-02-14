import Section from "../Layout/Section";
import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Box, Select, Flex } from "@chakra-ui/react";
import AreaGraph from "../Graphs and Chart/AreaGraph";

const ChainValidatorsGraph = () => {
  return (
    <Section
      heading="Chain Centrization"
      subtitle="Our top picks to get you started"
    >
      <DummyChart />
    </Section>
  );
};

export default ChainValidatorsGraph;

const DummyChart = () => {
  const [selectedOption, setSelectedOption] = useState("Option 1");

  // const data = {
  //   labels: ["January", "February", "March", "April", "May", "June", "July"],
  //   datasets: [
  //     {
  //       label: "Dummy Data",
  //       data: [65, 59, 80, 81, 56, 55, 40],

  //       backgroundColor: "rgba(75, 192, 192, 0.2)",
  //       borderColor: "rgba(75, 192, 192, 1)",
  //       borderWidth: 2,
  //     },
  //   ],
  // };

  // const options = {
  //   responsive: true,
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

  const data = [
    { month: "January", value: 65 },
    { month: "February", value: 59 },
    { month: "March", value: 80 },
    { month: "April", value: 81 },
    { month: "May", value: 56 },
    { month: "June", value: 55 },
    { month: "July", value: 40 },
  ];

  const handleSelectChange = (event: any) => {
    setSelectedOption(event.target.value);
  };

  return (
    <Box position="relative" width={"100%"} pos={"relative"}>
      <Box width="full" height="300px" margin="20px auto" position={"relative"}>
        {/* <Line data={data} options={options} /> */}
        <Flex justifyContent={"flex-end"} position={"absolute"} right={'15px'} top={"20px"} zIndex={40}>
          <Select
            width={"150px"}
            mr={"20px"}
            position="absolute"
            value={selectedOption}
            onChange={handleSelectChange}
          >
            <option value="Option 1">25 Meanfuls</option>
            <option value="Option 2">Option 2</option>
            <option value="Option 3">Option 3</option>
          </Select>
        </Flex>
        <AreaGraph lineData={data} colors={["#C88864"]} xKey={"month"} yKey={["value"]} />
      </Box>
    </Box>
  );
};
