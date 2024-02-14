import React from "react";
import { Line } from "react-chartjs-2";
import Section from "../Layout/Section";
import { Box } from "@chakra-ui/react";
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

const data = [
  { month: "Jan", value1: 100, value2: 500 },
  { month: "Feb", value1: 120, value2: 400},
  { month: "Mar", value1: 130, value2: 300},
  { month: "Apr", value1: 140, value2: 200},
  { month: "May", value1: 150, value2: 100},
  { month: "Jun", value1: 100, value2: 90},
  { month: "Jul", value1: 90 , value2: 80},
  { month: "Aug", value1: 180, value2: 70},
  { month: "Sep", value1: 70, value2: 60},
  { month: "Oct", value1: 80, value2: 50},
  { month: "Nov", value1: 110, value2: 40},
  { month: "Dec", value1: 120, value2: 30},
];

const AssetGraph = () => {

  return (
    <Section heading="Total Supply" subtitle="Our top picks to get you started" >
      <Box position={"relative"} width={"100%"} height={"60vh"}>
        {/* <Line data={data} options={options} /> */}
        <AreaGraph lineData={data} colors={["#C88864", "#BC3D70"]} xKey={"month"} yKey={["value1", "value2"]} />
      </Box>
    </Section>
  );
}

export default AssetGraph;
