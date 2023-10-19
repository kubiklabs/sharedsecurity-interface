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
