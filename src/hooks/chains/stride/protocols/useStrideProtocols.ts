import useStrideDefiAdapter from "../adapter/useStrideDefiAdapter";
import { protocols } from "../../../../config/aezProtocols.json";

export const useStrideProtocol = () => {
  const {
    stride: { tvl },
  } = useStrideDefiAdapter;

  const getStrideAllTvl = async () => {
    return tvl();
  };

  const getParsedStrideData = async () => {
    const tvl = await getStrideAllTvl();
    let data: any = protocols.find(({ name }) => name === "Stride");
    data = {
      ...data,
      tvl,
    };
    return data;
  };

  return { getStrideAllTvl, getParsedStrideData };
};
