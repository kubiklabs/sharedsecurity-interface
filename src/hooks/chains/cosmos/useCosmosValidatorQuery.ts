import { useRecoilState, useRecoilValue } from "recoil";
import { useValidatorQuery } from "../../common/validators/useValidatorsQuery";
import { cosmosValidatorState } from "../../../context/cosmosValidatorState";
import { useCosmosGovQuery } from "./useCosmosGovQuery";
import { coinConvert } from "../../../utils/common";
import axios from "axios";

const COSMOS_REST_URL = "https://cosmoshub-api.lavenderfive.com:443";

export const useCosmosValidatorQuery = () => {
  const [{ validators }, setValidators] = useRecoilState(cosmosValidatorState);

  const { getFullValidatorList, getActiveValidatorSet } =
    useValidatorQuery(COSMOS_REST_URL);
  const { getCosmosTotalBondedToken } = useCosmosGovQuery();

  const getAllCosmosValidators = async () => {
    const allValidators = await getFullValidatorList();

    allValidators.sort(
      (a: any, b: any) => Number(b?.tokens) - Number(a?.tokens)
    );

    return allValidators;
  };

  const getCosmosUnjailedValidators = async () => {
    let allValidators = validators;
    if (!allValidators.length) allValidators = await getAllCosmosValidators();
    allValidators = allValidators.filter(
      (validator) => validator.jailed === false
    );
    allValidators = allValidators.sort((a, b) => Number(b.tokens) - a.tokens);

    return allValidators;
  };

  const getParsedActiveValidators = async () => {
    const totalBonded = await getCosmosTotalBondedToken();
    let allValidators = await getAllCosmosValidators();
    let parsedValidators = [];
    let parsedJailedValidators = [];
    let parsedActiveValidators = [];

    for (const index in allValidators) {
      const validator = allValidators[index];
      // console.log(validator);

      const parsedValidator = {
        Validator: validator.description.moniker,
        Power: Number(
          coinConvert(validator.tokens, 6, "human")
        ).toLocaleString(),
        "Share %": `${((validator.tokens / Number(totalBonded)) * 100).toFixed(
          2
        )}%`,
        "Commision Rate": `${(
          Number(validator.commission.commission_rates.rate) * 100
        ).toFixed(2)}%`,
      };
      parsedValidators.push(parsedValidator);

      if (validator.jailed === true)
        parsedJailedValidators.push(parsedValidator);
      else parsedActiveValidators.push(parsedValidator);
    }
    setValidators({
      validators: parsedValidators,
      jailed: parsedJailedValidators,
      active: parsedActiveValidators.slice(0, 180),
    });

    return parsedActiveValidators.slice(0, 180);
  };

  return {
    getAllCosmosValidators,
    getCosmosUnjailedValidators,
    getParsedActiveValidators,
  };
};
