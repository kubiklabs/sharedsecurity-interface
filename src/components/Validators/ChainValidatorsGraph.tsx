import Section from "../Layout/Section";
import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { Box, Select, Flex } from "@chakra-ui/react";

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

  const data = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Dummy Data",
        data: [65, 59, 80, 81, 56, 55, 40],

        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
      },
    ],
  };

  const options = {
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

  const handleSelectChange = (event : any) => {
    setSelectedOption(event.target.value);
  };

  return (
    <Box position="relative" width={"100%"}>
      <Flex justifyContent={"flex-end"}>
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
      <Box width="full" height="300px" margin="20px auto">
        <Line data={data} options={options} />
      </Box>
    </Box>
  );
};
