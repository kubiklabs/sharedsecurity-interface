import { useGovernanceQuery } from "../useGovernanceQuery";
import { Stride } from "../../../config/nodeConfig.json";

const trustedRest = `${Stride.REST}/`;

export const useStrideGovQuery = () => {
  const {
    getGovProposals,
    getAllGovProposals,
    getProposalById,
    getTotalBondedToken,
    getUserDelegations,
    getVotingPower,
    getProposalTurnout,
    getProposalType,
    getVoteDistribution,
    getParsedProposalsList,
    getLpList,
    getOpList,
    getParsedProposal,
    getUserVote,
  } = useGovernanceQuery(trustedRest, "Stride");

  const getStrideGovProposals = async () => {
    return await getGovProposals();
  };

  const getAllStrideGovProposals = async () => {
    return await getAllGovProposals();
  };

  const getStrideProposalById = async (proposalId: string) => {
    return await getProposalById(proposalId);
  };

  const getStrideTotalBondedToken = async () => {
    return await getTotalBondedToken();
  };

  const getUserStrideDelegations = async (address: string) => {
    return await getUserDelegations(address);
  };

  const getStrideVotingPower = async (address: string) => {
    const votingPower = await getVotingPower(address);
    return votingPower;
  };

  const getStrideUserVote = async (proposalId: string) => {
    return await getUserVote("Stride", proposalId);
  };

  const getStrideProposalTurnout = async (proposal: any) => {
    return await getProposalTurnout(proposal);
  };

  const getStrideVoteDistribution = (proposal: any) => {
    return getVoteDistribution(proposal);
  };

  const getStrideParsedProposals = async () => {
    return await getParsedProposalsList();
  };

  const getStrideLpList = async () => {
    return await getLpList();
  };

  const getStrideOpList = async () => {
    return await getOpList();
  };

  const getParsedStrideProposal = async (id: string) => {
    return await getParsedProposal(id);
  };

  return {
    getStrideGovProposals,
    getStrideLpList,
    getProposalType,
    getStrideVoteDistribution,
    getStrideOpList,
    getStrideUserVote,
    getAllStrideGovProposals,
    getStrideProposalById,
    getParsedStrideProposal,
    getStrideTotalBondedToken,
    getStrideVotingPower,
    getStrideParsedProposals,
    getStrideProposalTurnout,
    getUserStrideDelegations,
  };
};
