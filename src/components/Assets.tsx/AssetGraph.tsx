import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import Section from "../Layout/Section";
import { Box, Select } from "@chakra-ui/react";

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

const AssetGraph = () => {
  const [chartData, setChartData] = useState(data);
  const [selectedOption, setOption] = useState<any>()
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // const item = e.target.value;
    // if (item === "neutron") {
    //   setOption()
    // }
    // if (item === "stride") {
    //   setOption()
    // }
    // if (item === "cosmos") {
    //   setOption()
    // }
    console.log(selectedOption)
  }
  // Update chart data if needed

  return (
    <Section heading="Total Supply" subtitle="Our top picks to get you started" >
        <Box position={"relative"}>
        <Select
          onChange={handleChange}
          size="lg"
          minW={"100px"}
          width={"fit-content"}
          position={"absolute"}
          top={"10"}
          right={"30"}
        >
          <option value="neutron">Neutron</option>
          <option value="stride">Stride</option>
          <option value="cosmos">Cosmos Hub</option>
        </Select>
      <Line data={chartData} options={options} />
      </Box>
    </Section>
  );
}

export default AssetGraph;
