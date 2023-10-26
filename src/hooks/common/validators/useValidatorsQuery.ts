import axios, { AxiosResponse, all } from "axios";

export const useValidatorQuery = (restUrl: string) => {
  const getFullValidatorList = async () => {
    let allValidators: any = [];
    try {
      let pagination_key: string | null = "";
      while (pagination_key !== null) {
        const response: AxiosResponse<any, any> = await axios.get(
          `${restUrl}/cosmos/staking/v1beta1/validators?pagination.limit=200&pagination.key=${encodeURIComponent(
            pagination_key
          )}`
        );
        pagination_key = response.data.pagination.next_key;
        allValidators = [...allValidators, ...response.data.validators];
        // console.log(pagination_key, allValidators);
      }
      return allValidators;
    } catch (error) {
      console.log(error);
    }
  };

  const getActiveValidatorSet = async () => {
    try {
      const response = await axios.get(
        `${restUrl}/cosmos/base/tendermint/v1beta1/validatorsets/latest`
      );
      return response.data.validators;
    } catch (error) {
      console.log(error);
    }
  };

  return { getFullValidatorList, getActiveValidatorSet };
};
