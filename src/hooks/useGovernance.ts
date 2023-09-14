import { useCosmosGovQuery } from "./chains/cosmos/useCosmosGovQuery";
import { useCosmosGovTxn } from "./chains/cosmos/useCosmosGovTxn";
import { useNeutronGovQuery } from "./chains/neutron/useNeutronGovQuery";
import { useNeutronGovTxn } from "./chains/neutron/useNeutronGovTxn";
import { useStrideGovQuery } from "./chains/stride/useStrideGovQuery";
import { useStrideGovTxn } from "./chains/stride/useStrideGovTxn";

export const useGovernance = () => {
  const { getParsedCosmosProposal, getCosmosTotalBondedToken } =
    useCosmosGovQuery();
  const { getParsedNeutronProposal } = useNeutronGovQuery();
  const { getParsedStrideProposal } = useStrideGovQuery();
  const { sendCosmosVote } = useCosmosGovTxn();
  const { sendStrideVote } = useStrideGovTxn();
  const { sendNeutronVote } = useNeutronGovTxn();
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

  const sendGovVote = async (
    name: string,
    proposalId: string,
    voteOption: string
  ) => {
    switch (name) {
      case "Cosmos":
        return await sendCosmosVote(proposalId, voteOption);
        break;
      case "Stride":
        return await sendStrideVote(proposalId, voteOption);
        break;
      case "Neutron":
        return await sendNeutronVote(proposalId, voteOption);
      default:
        break;
    }
  };
  return { fetchProposalByIdAndName, fetchTotalBondedToken, sendGovVote };
};
