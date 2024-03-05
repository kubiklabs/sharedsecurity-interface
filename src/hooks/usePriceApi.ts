import axios from "axios";

export const usePriceApi = () => {
  const getSinglePrice = async (coingecko_id: string) => {
    try {
      const result = (
        await axios.get(
          `https://price-api.sharedsecurity.info/multiprice?coin_ids=${coingecko_id}`
        )
      ).data[0];
      return result;
    } catch (error) {
      console.log(error);
    }
  };

  const getMultiplePrice = async (coingecko_ids: String[]) => {
    let multipleIdString = "";
    for (const id of coingecko_ids) {
      multipleIdString += id + ",";
    }
    try {
      const result = (
        await axios.get(
          `https://price-api.sharedsecurity.info/multiprice?coin_ids=${multipleIdString}`
        )
      ).data;
      const priceData = result.reduce((acc: any, item: any) => {
        const { coin_id, ...rest } = item;
        acc[coin_id] = { coin_id, ...rest };
        return acc;
      }, {});
      return priceData;
    } catch (error) {
      console.log(error);
    }
  };

  const getConsumerChainPrices = async () => {
    try {
      const result = (
        await axios.get(
          `https://price-api.sharedsecurity.info/multiprice?coin_ids=cosmos,neutron,stride`
        )
      ).data;
      const priceData = result.reduce((acc: any, item: any) => {
        const { coin_id, ...rest } = item;
        acc[coin_id] = { coin_id, ...rest };
        return acc;
      }, {});
      return priceData;
    } catch (error) {
      console.log(error);
    }
  };

  return { getConsumerChainPrices, getMultiplePrice, getSinglePrice };
};