import { atom } from "recoil";

export const ecosystemState = atom<{
  data: Array<any>;
}>({
  key: "ecosystemState",
  default: {
    data: [],
  },
  dangerouslyAllowMutability: true,
});

export const marsTvlState = atom<{
  tvl: string | number;
}>({
  key: "marsTvl",
  default: {
    tvl: "",
  },
  dangerouslyAllowMutability: true,
});
export const astroportTvlState = atom<{
  tvl: string | number;
}>({
  key: "astroportTvl",
  default: {
    tvl: "",
  },
  dangerouslyAllowMutability: true,
});
export const strideTvlState = atom<{
  tvl: string | number;
}>({
  key: "strideTvl",
  default: {
    tvl: "",
  },
  dangerouslyAllowMutability: true,
});
