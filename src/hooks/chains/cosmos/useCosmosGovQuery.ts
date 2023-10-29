import { useRecoilState } from "recoil";
import { useGovernanceQuery } from "../useGovernanceQuery";
import { userVpState } from "../../../context/userVpState";

let trustedRest = "https://cosmos-rest.publicnode.com";

export const useCosmosGovQuery = () => {
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
  } = useGovernanceQuery(trustedRest, "Cosmos");

  const [userVp, setUserVp] = useRecoilState(userVpState);

  const getCosmosGovProposals = async () => {
    return await getGovProposals();
  };

  const getAllCosmosGovProposals = async () => {
    return await getAllGovProposals();
  };

  const getCosmosProposalById = async (proposalId: string) => {
    return await getProposalById(proposalId);
  };

  const getCosmosTotalBondedToken = async () => {
    return await getTotalBondedToken();
  };

  const getUserCosmosDelegations = async (address: string) => {
    return await getUserDelegations(address);
  };

  const getCosmosVotingPower = async (address: string) => {
    const votingPower = await getVotingPower(address);
    const updatedState = { ...userVp, Cosmos: votingPower };
    return votingPower;
  };

  const getCosmosUserVote = async (proposalId: string) => {
    return await getUserVote("Cosmos", proposalId);
  };

  const getCosmosProposalTurnout = async (proposal: any) => {
    return await getProposalTurnout(proposal);
  };

  const getCosmosVoteDistribution = (proposal: any) => {
    return getVoteDistribution(proposal);
  };

  const getCosmosParsedProposals = async () => {
    return await getParsedProposalsList();
  };

  const getCosmosLpList = async () => {
    return await getLpList();
  };

  const getCosmosOpList = async () => {
    return await getOpList();
  };

  const getParsedCosmosProposal = async (id: string) => {
    return await getParsedProposal(id);
  };

  return {
    getCosmosGovProposals,
    getCosmosLpList,
    getProposalType,
    getCosmosVoteDistribution,
    getCosmosOpList,
    getAllCosmosGovProposals,
    getCosmosProposalById,
    getParsedCosmosProposal,
    getCosmosTotalBondedToken,
    getCosmosVotingPower,
    getUserCosmosDelegations,
    getCosmosProposalTurnout,
    getCosmosParsedProposals,
    getCosmosUserVote,
  };
};
