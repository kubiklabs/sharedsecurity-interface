import { atom } from "recoil";

export const cosmosValidatorState = atom<{
  validators: any[];
  active: any[];
  jailed: any[];
  nCoefficient: string;
  mCoefficient: string;
}>({
  key: "cosmosValidatorState",
  default: {
    validators: [],
    active: [],
    jailed: [],
    nCoefficient: "",
    mCoefficient: "",
  },
  dangerouslyAllowMutability: true,
});
