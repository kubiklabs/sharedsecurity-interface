import { atom } from "recoil";

export const cosmosValidatorState = atom<{
  validators: any[];
}>({
  key: "cosmosValidatorState",
  default: {
    validators: [],
  },
  dangerouslyAllowMutability: true,
});
