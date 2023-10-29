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
