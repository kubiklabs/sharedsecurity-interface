import axios from "axios";
import { useRecoilState } from "recoil";
import { marketState } from "../context/marketState";

export const useChainMarketInfo = () => {
  const [marketData, setMarketData] = useRecoilState(marketState);

  const getAllCoinsMarket = async () => {
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

  const getHistoricalPrice = async (coin: string, days: string) => {
    const response = await axios.get(`
    https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=${days}`);

    return response.data;
  };

  return { getAllCoinsMarket, getHistoricalPrice };
};
