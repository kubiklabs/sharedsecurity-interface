import React from "react";
import { Line } from "react-chartjs-2";
import Section from "../Layout/Section";
import { Box } from "@chakra-ui/react";

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

const AssetGraph = () => {

  return (
    <Section heading="Total Supply" subtitle="Our top picks to get you started" >
        <Box position={"relative"} width={"100%"} height={"60vh"}>
      <Line data={data} options={options} />
      </Box>
    </Section>
  );
}

export default AssetGraph;
