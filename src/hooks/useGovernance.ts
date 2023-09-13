import { useCosmosGovQuery } from "./chains/cosmos/useCosmosGovQuery";
import { useNeutronQuery } from "./chains/neutron/useNeutronQuery";
import { useStrideQuery } from "./chains/stride/useStrideQuery";

export const useGovernance = () => {
  const { getParsedCosmosProposal, getCosmosTotalBondedToken } =
    useCosmosGovQuery();
  const { getParsedNeutronProposal } = useNeutronQuery();
  const { getParsedStrideProposal } = useStrideQuery();
  const fetchProposalByIdAndName = async (name: string, id: string) => {
    console.log(id, name);

    switch (name) {
      case "Cosmos":
        // console.log(id);

        return await getParsedCosmosProposal(id);

      case "Neutron":
        return await getParsedNeutronProposal(id);

      case "Stride":
        return await getParsedStrideProposal(id);
      default:
        break;
    }
  };
  const fetchTotalBondedToken = async (name: string) => {
    switch (name) {
      case "Cosmos":
        return await getCosmosTotalBondedToken();
        break;

      default:
        break;
    }
  };
  return { fetchProposalByIdAndName, fetchTotalBondedToken };
};
