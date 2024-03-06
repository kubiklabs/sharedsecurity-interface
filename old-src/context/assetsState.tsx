import { atom } from "recoil";

export const strideAssetState = atom<{
  assets: any[];
}>({
  key: "strideAssetState",
  default: {
    assets: [],
  },
  dangerouslyAllowMutability: true,
});

export const cosmosAssetState = atom<{
  assets: any[];
}>({
  key: "cosmosAssetState",
  default: {
    assets: [],
  },
  dangerouslyAllowMutability: true,
});

export const neutronAssetState = atom<{
  assets: any[];
}>({
  key: "neutronAssetState",
  default: {
    assets: [],
  },
  dangerouslyAllowMutability: true,
});
