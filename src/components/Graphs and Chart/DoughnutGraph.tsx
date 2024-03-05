import { Flex } from "@chakra-ui/react";
import ReactECharts from "echarts-for-react";

const DoughnutGraph = ({ doughnutData }: { doughnutData: any[] }) => {
  const option = {
    legend: {
      show: true,
      bottom: "0",
      textStyle: {
        color: "white",
        fontSize: "14px",
        fontFamily: "Alata",
      },
    },
    series: [
      {
        name: "Dummy Data",
        type: "pie",
        radius: ["40%", "60%"],

        data: doughnutData,
        label: {
          show: true,
          formatter: function (params: any) {
            return `{a|$${params.data.shortValue}}\n{b|${params.name}:} {c|(${params.percent}%)}`;
          },
          fontFamily: "Alata",
          backgroundColor: "transparent",
          padding: [3, 10, 10, 5],
          rich: {
            a: {
              color: "inherit",
              fontSize: "16px",
              height: 25,
              fontWeight: "800",
              fontFamily: "Alata",
            },
            b: {
              color: "white",
              fontSize: "14px",
              fontFamily: "Alata",
            },
            c: {
              color: "white",
              fontSize: "12px",
              fontFamily: "Alata",
            },
          },
        },
        labelLine: {
          length: 30,
          length2: 20,
          lineStyle: {
            join: "miter",
            width: 1.5,
          },
        },
        itemStyle: {
          fontFamily: "Alata",

          emphasis: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  return (
    <Flex
      height={"100%"}
      width={"100%"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <ReactECharts
        option={option}
        style={{ width: "100%", height: "100%", overflow: "visible" }}
      />
    </Flex>
  );
};

export default DoughnutGraph;
