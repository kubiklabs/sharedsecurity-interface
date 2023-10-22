import { useRecoilState, useRecoilValue } from "recoil";
import { useValidatorQuery } from "../../common/validators/useValidatorsQuery";
import { cosmosValidatorState } from "../../../context/cosmosValidatorState";
import { useCosmosGovQuery } from "./useCosmosGovQuery";
import { coinConvert } from "../../../utils/common";

const COSMOS_REST_URL = "https://cosmoshub-api.lavenderfive.com:443";

export const useCosmosValidatorQuery = () => {
  const [{ validators }, setValidators] = useRecoilState(cosmosValidatorState);

  const { getFullValidatorList } = useValidatorQuery(COSMOS_REST_URL);
  const { getCosmosTotalBondedToken } = useCosmosGovQuery();

  const getAllCosmosValidators = async () => {
    const allValidators = await getFullValidatorList();
    setValidators({
      validators: allValidators,
    });
    return allValidators;
  };

  const getCosmosActiveValidators = async () => {
    let allValidators = validators;
    if (!allValidators.length) allValidators = await getAllCosmosValidators();
    return allValidators.filter((validator) => validator.jailed === false);
  };

  const getParsedActiveValidators = async () => {
    const totalBonded = await getCosmosTotalBondedToken();
    let allValidators = validators;
    if (!allValidators.length) allValidators = await getAllCosmosValidators();
    let parsedActiveValidators = [];
    // console.log(allValidators);

    for (const index in allValidators) {
      const validator = allValidators[index];
      //   console.log(validator);

      if (validator.jailed === false) {
        parsedActiveValidators.push({
          Validator: validator.description.moniker,
          Power: Number(
            coinConvert(validator.tokens, 6, "human")
          ).toLocaleString(),
          "Share %": `${(
            (validator.tokens / Number(totalBonded)) *
            100
          ).toFixed(2)}%`,
          "Commision Rate": `${(
            Number(validator.commission.commission_rates.rate) * 100
          ).toFixed(2)}%`,
        });
      }
    }

    return parsedActiveValidators.sort(
      (a, b) =>
        Number(b.Power.replace(/,/g, "")) - Number(a.Power.replace(/,/g, ""))
    );
  };

  return {
    getAllCosmosValidators,
    getCosmosActiveValidators,
    getParsedActiveValidators,
  };
};
