import axios from "axios";
import { useRecoilState } from "recoil";
import { marketState } from "../context/marketState";
import { borderTagColorMap, tagColorMap } from "../utils/constant";

export const useChainMarketInfo = () => {
  const [marketData, setMarketData] = useRecoilState(marketState);

  const getAllCoinsMarket = async () => {
    try {
    } catch (error) {}
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=neutron%2Ccosmos%2C%20stride&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en"
    );
    const marketData = response.data;
    const newData = {
      Cosmos: marketData[0],
      Stride: marketData[1],
      Neutron: marketData[2],
    };
    setMarketData(newData);
    return newData;
  };

  const getHistoricalPrice = async (coin: string) => {
    // const response = await axios.get(
    //   `https://api.llama.fi/v2/historicalChainTvl/${coin}`
    // );
    let rawData;
    let parsedData;
    if (coin === "Stride") {
      const response = await axios.get("https://api.llama.fi/protocol/stride");
      rawData = response.data.chainTvls.Stride.tvl;
      parsedData = {
        label: coin,
        data: rawData.map((obj: any) => obj.totalLiquidityUSD),
        borderColor: tagColorMap[coin as keyof typeof tagColorMap],
        backgroundColor: tagColorMap[coin as keyof typeof tagColorMap],
      };
    } else {
      const response = await axios.get(
        `https://api.llama.fi/v2/historicalChainTvl/${coin}`
      );
      rawData = response.data;

      parsedData = {
        label: coin,
        data: rawData.map((obj: any) => obj.tvl),
        borderColor: tagColorMap[coin as keyof typeof tagColorMap],
        backgroundColor: tagColorMap[coin as keyof typeof tagColorMap],
      };
    }

    return {
      labels: rawData.map((obj: any) => {
        const date = new Date(obj.date * 1000); // Multiply by 1000 to convert from seconds to milliseconds

        const day = date.getDate();
        const month = date.getMonth() + 1; // Month is 0-based, so add 1 to get the actual month
        const year = date.getFullYear();

        const formattedDate = `${day}/${month}/${year}`;
        return formattedDate;
      }),
      data: parsedData,
    };
  };

  return { getAllCoinsMarket, getHistoricalPrice };
};
