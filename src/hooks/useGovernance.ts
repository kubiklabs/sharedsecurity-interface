import { useCosmosGovQuery } from "./chains/cosmos/useCosmosGovQuery";
import { useNeutronQuery } from "./chains/neutron/useNeutronQuery";

export const useGovernance = () => {
  const { getParsedCosmosProposal, getCosmosTotalBondedToken } =
    useCosmosGovQuery();
  const { getParsedNeutronProposal } = useNeutronQuery();
  const fetchProposalByIdAndName = async (name: string, id: string) => {
    console.log(id, name);

    switch (name) {
      case "Cosmos":
        console.log(id);

        return await getParsedCosmosProposal(id);

      case "Neutron":
        return await getParsedNeutronProposal(id);
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
