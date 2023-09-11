import { useCosmosGovQuery } from "./chains/cosmos/useCosmosGovQuery";

export const useGovernance = () => {
  const { getParsedCosmosProposal } = useCosmosGovQuery();
  const fetchProposalByIdAndName = async (name: string, id: string) => {
    console.log(id, name);

    switch (name) {
      case "Cosmos":
        console.log(id);

        return await getParsedCosmosProposal(id);
      default:
        break;
    }
  };
  return { fetchProposalByIdAndName };
};
