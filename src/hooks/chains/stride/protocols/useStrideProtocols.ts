import useStrideDefiAdapter from "../adapter/useStrideDefiAdapter";
import { protocols } from "../../../../config/aezProtocols.json";
import { useSetRecoilState } from "recoil";
import { strideTvlState } from "../../../../context/ecosystemState";

export const useStrideProtocol = () => {
  const {
    stride: { tvl },
  } = useStrideDefiAdapter;

  const setStrideTvl = useSetRecoilState(strideTvlState);

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

    setStrideTvl({
      ...data,
      tvl: tvl as number,
    });

    return data;
  };

  return { getStrideAllTvl, getParsedStrideData };
};
