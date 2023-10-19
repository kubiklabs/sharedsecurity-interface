import { useRecoilState, useSetRecoilState } from "recoil";
import { protocols } from "../config/aezProtocols.json";
import { useNtrnAstroQuery } from "./chains/neutron/astroport/useNtrnAstroQuery";
import { ecosystemState } from "../context/ecosystemState";
import { useNtrnMarsQuery } from "./chains/neutron/mars/useNtrnMarsQuery";

export const useAez = () => {
  const { getParsedAstroportData } = useNtrnAstroQuery();
  const { getParsedMarsData } = useNtrnMarsQuery();
  const setEcosystemState = useSetRecoilState(ecosystemState);

  const getParsedEcosystemData = async () => {
    let parsedProtocols: any = [];
    for (const i in protocols) {
      let name = protocols[i].name;
      switch (name) {
        case "Astroport":
          const astroData = await getParsedAstroportData();
          parsedProtocols = [...parsedProtocols, astroData];
          break;

        case "Mars":
          const marsData = await getParsedMarsData();
          parsedProtocols = [...parsedProtocols, marsData];
          break;

        default:
          break;
      }
    }
    setEcosystemState(parsedProtocols);
    return parsedProtocols;
  };
  return { getParsedEcosystemData };
};
