import ReactECharts from 'echarts-for-react';

const DoughnutGraph = ({ doughnutData }: { doughnutData: object }) => {
    const option = {
        series: [
            {

                name: 'Dummy Data',
                type: 'pie',
                radius: ['50%', '80%'],
                data: doughnutData,
                label: {
                    show: true,
                    formatter: function (params: any) {
                        return `{a|$${params.data.value.toLocaleString("en", {
                            maximumFractionDigits: 3,
                        })}}\n{b|${params.name}:} {c|${params.percent}%}`;
                    },
                    rich: {
                        a: {
                            color: 'white',
                            fontSize: '12px',
                            height: 25,
                        },
                        b: {
                            color: 'white',
                            fontSize: '10px',
                        },
                        c: {
                            color: 'white',
                            fontSize: '10px',
                        }
                    }
                },
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };

    return (
        <>
            <ReactECharts
                option={option}
                style={{ width: "100%" }}
            />
        </>
    );
};

export default DoughnutGraph;
