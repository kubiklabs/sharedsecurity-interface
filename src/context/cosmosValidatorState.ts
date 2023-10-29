import { atom } from "recoil";

export const cosmosValidatorState = atom<{
  validators: any[];
  active: any[];
  jailed: any[];
}>({
  key: "cosmosValidatorState",
  default: {
    validators: [],
    active: [],
    jailed: [],
  },
  dangerouslyAllowMutability: true,
});
