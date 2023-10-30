import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Colors,
  Decimation,
} from "chart.js";
import {} from "chart.js/helpers";
import { Line } from "react-chartjs-2";
//   import faker from 'faker';
// import faker from "faker";
import Section from "../Layout/Section";
import { useChainMarketInfo } from "../../hooks/useChainMarketInfo";
import CustomSkeleton from "../skeleton/CustomSkeleton";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Colors,
  Decimation
);

export const options = {
  responsive: true,
  plugins: {
    customCanvasBackgroundColor: {
      color: "lightGreen",
    },
    colors: {
      forceOverride: true,
    },
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chains",
    },
    decimation: {
      enabled: true,
      algoritghm: "min-max",
      sample: 50,
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Date",
      },
      border: {
        display: true,
      },
      grid: {
        display: true,
        drawOnChartArea: true,
        drawTicks: true,
        color: "#000",
      },
    },
    y: {
      title: {
        display: true,
        text: "TVL(in USD)",
      },
      border: {
        display: true,
      },
      grid: {
        display: true,
        drawOnChartArea: true,
        drawTicks: true,
      },
    },
  },
};

const Trends = () => {
  const { getHistoricalPrice } = useChainMarketInfo();
  const [finalData, setFinalData] = useState<any>();
  // const [finalLabels, setFinalLabels] = useState(labels);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    let cosmosTrend = await getHistoricalPrice("Cosmos");
    let strideTrend = await getHistoricalPrice("Stride");
    let neutronTrend = await getHistoricalPrice("Neutron");

    const maxLength = neutronTrend.labels.length;
    const strideData = strideTrend.data.data;
    const cosmosData = cosmosTrend.data.data;

    strideTrend = {
      ...strideTrend,
      data: {
        ...strideTrend.data,
        data: strideData.slice(
          strideData.length - maxLength,
          strideData.length
        ),
      },
    };

    cosmosTrend = {
      ...cosmosTrend,
      data: {
        ...cosmosTrend.data,
        data: cosmosData.slice(
          cosmosData.length - maxLength,
          cosmosData.length
        ),
      },
    };
    console.log(
      maxLength,
      strideData.slice(strideData.length - maxLength, strideData.length)
    );

    console.log(cosmosTrend, strideTrend, neutronTrend);
    const graphData = {
      labels: neutronTrend.labels,
      datasets: [cosmosTrend.data, strideTrend.data, neutronTrend.data],
    };
    setFinalData(graphData);
  };
  return (
    <Section>
      {finalData ? (
        <Line data={finalData} options={options} />
      ) : (
        <CustomSkeleton count={1} height="500px" />
      )}
    </Section>
  );
};

export default Trends;
