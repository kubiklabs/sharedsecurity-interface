import axios, { all } from "axios";

const REST_URL = "https://cosmos-lcd.easy2stake.com";

export const useCosmosAssets = () => {
  const getCosmosSupply = async () => {
    let allSupply: any = [];
    let paginationKey = "";
    while (paginationKey !== null) {
      const response = await axios.get(
        `${REST_URL}/cosmos/bank/v1beta1/supply?pagination.key=${paginationKey}`
      );
      allSupply.concat(response.data.supply);
      paginationKey = response.data.pagination.next_key;
    }
    console.log(allSupply);
    return allSupply;
  };
};
