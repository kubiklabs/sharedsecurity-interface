import { useRecoilState, useSetRecoilState } from "recoil";
import aezProtocolsList from "../config/aezProtocols.json";
import { useNtrnAstroQuery } from "./chains/neutron/astroport/useNtrnAstroQuery";
import { ecosystemState } from "../context/ecosystemState";
import { useNtrnMarsQuery } from "./chains/neutron/mars/useNtrnMarsQuery";
import { useStrideProtocol } from "./chains/stride/protocols/useStrideProtocols";
import { useNtrnApolloQuery } from "./chains/neutron/apollo/useNtrnApolloQuery";

export const useAez = () => {
  const { getParsedAstroportData } = useNtrnAstroQuery();
  const { getParsedMarsData } = useNtrnMarsQuery();
  const { getParsedStrideData } = useStrideProtocol();
  const { getParsedApolloData } = useNtrnApolloQuery();
  const setEcosystemState = useSetRecoilState(ecosystemState);

  const getParsedEcosystemData = async () => {
    const { protocols } = aezProtocolsList;
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

        case "Stride":
          const strideData = await getParsedStrideData();
          parsedProtocols = [...parsedProtocols, strideData];
          break;

        case "Apollo":
          const apolloData = await getParsedApolloData();
          parsedProtocols = [...parsedProtocols, apolloData];
          break;
        default:
          break;
      }
    }
    setEcosystemState({ data: parsedProtocols });
    return parsedProtocols;
  };
  return { getParsedEcosystemData };
};
