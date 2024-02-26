import { Box, Flex } from "@chakra-ui/react";
import ReactECharts from "echarts-for-react";

const DoughnutGraph = ({ doughnutData }: { doughnutData: any[] }) => {

    const option = {
        // legend: {
        //   orient: "vertical",
        //   left: "left",
        //   data: doughnutData.map((item) => item.name)
        // },
        series: [
            {
                name: "Dummy Data",
                type: "pie",
                radius: ["50%", "80%"],
                data: doughnutData,
                label: {
                    show: true,
                    formatter: function (params: any) {
                        console.log(params);
                        return `{a|$${params.data.shortValue}}\n{b|${params.name}:} {c|${params.percent}%}`;
                    },
                    rich: {
                        a: {
                            color: "white",
                            fontSize: "16px",
                            height: 25,
                        },
                        b: {
                            color: "white",
                            fontSize: "14px",
                        },
                        c: {
                            color: "white",
                            fontSize: "12px",
                        },
                    },
                },
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: "rgba(0, 0, 0, 0.5)",
                    },
                }
            },
        ],
    };

    return (
        <Flex height={"100%"} width={"100%"} justifyContent={"center"} alignItems={"center"}>
            <ReactECharts
                option={option}
                style={{ width: "100%", overflow: "visible" }}
            />
        </Flex>
    );
};

export default DoughnutGraph;
