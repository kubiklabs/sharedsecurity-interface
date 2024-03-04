import axios from "axios";
import { ILpCardProps } from "../../components/Governance/LpCard";
import {
  getDenomFromName,
  getSymbolFromName,
  parseIsoTimeString,
} from "../../utils/common";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { walletState } from "../../context/walletState";

interface IProposalData {
  proposals: Array<any>;
  pagination: any;
}

export const useGovernanceQuery = (restUrl: string, chain: string) => {
  const [proposalsList, setProposalsList] = useState<Array<ILpCardProps>>([]);
  const addresses = useRecoilValue(walletState);

  const getGovProposals = async () => {
    const response = await axios.get(`${restUrl}/cosmos/gov/v1beta1/proposals`);
    const proposalsData: IProposalData = response.data;
    return proposalsData;
  };

  const getAllGovProposals = async () => {
    let allProposalData: any = [];
    const response = await axios.get(`${restUrl}/cosmos/gov/v1beta1/proposals`);
    let proposalsData: IProposalData = response.data;
    allProposalData = allProposalData.concat(proposalsData.proposals);

    while (proposalsData.pagination.next_key != null) {
      const response = await axios.get(
        `${restUrl}/cosmos/gov/v1beta1/proposals?pagination.key=${encodeURIComponent(
          proposalsData.pagination.next_key
        )}`
      );
      proposalsData = response.data;
      allProposalData = allProposalData.concat(proposalsData.proposals);
    }
    return allProposalData;
  };

  const getProposalById = async (proposalId: string) => {
    const response = await axios.get(
      `${restUrl}/cosmos/gov/v1beta1/proposals/${proposalId}`
    );
    const proposal = response.data.proposal;

    return proposal;
  };

  const getTotalBondedToken = async () => {
    const response = await axios.get(`${restUrl}/cosmos/staking/v1beta1/pool`);
    const totalBonded = response.data.pool.bonded_tokens;
    return totalBonded;
  };

  const getUserDelegations = async (address: string) => {
    const response = await axios.get(
      `${restUrl}/cosmos/staking/v1beta1/delegations/${address}`
    );
    return response?.data.delegation_responses;
  };

  const getProposalTally = async (proposalId: string) => {
    try {
      const response = await axios.get(
        `${restUrl}/cosmos/gov/v1beta1/proposals/${proposalId}/tally`
      );
      return response.data;
    } catch (error) {
      return error;
    }
  };

  const getUserVote = async (chain: string, proposalId: string) => {
    const address = addresses[chain as keyof typeof addresses];
    if (!address) return;
    try {
      const response = await axios.get(
        `${restUrl}/cosmos/gov/v1beta1/proposals/${proposalId}/votes/${address}`
      );
      return response.data.vote.options[0].option;
    } catch (error) {
      console.log(error);
      return "";
    }
  };

  const getVotingPower = async (address: string) => {
    const totalDeposits = await getTotalBondedToken();
    const userDelegation = await getUserDelegations(address);
    let totalUserDelegatedAmount = 0;
    if (userDelegation.length) {
      userDelegation.forEach((item: any) => {
        totalUserDelegatedAmount += Number(item.balance.amount);
      });
    }

    const userVp = (totalUserDelegatedAmount / Number(totalDeposits)).toFixed(
      10
    );

    const votingPower = {
      address,
      amount: {
        amount: totalUserDelegatedAmount,
        denom: getSymbolFromName(chain),
      },
      userVotingPower: userVp,
      totalDeposits,
    };
    return votingPower;
  };

  const getProposalTurnout = async (proposal: any) => {
    const totalBonded = await getTotalBondedToken();
    const totalVoted = getVoteDistribution(proposal).totalAmount;
    const turnout = (
      (Number(totalVoted) / Number(totalBonded)) *
      100
    ).toLocaleString();

    return turnout;
  };

  const getProposalType = (proposal: any) => {
    const splitArray = proposal.content["@type"].split(".");
    const proposalType: string = splitArray[splitArray.length - 1]
      .replace("Proposal", "")
      .replace(/([A-Z])/g, " $1")
      .trim();
    return proposalType;
  };

  const calculateVoteDistribution = (votes: any) => {
    // const votes = proposal.final_tally_result;
    let totalVotes: number = 0;
    Object.values(votes).map((count) => {
      totalVotes += Number(count);
    });
    const YES = `${
      ((Number(votes.yes) / totalVotes) * 100).toLocaleString() || "-"
    }`;
    const NO = `${((Number(votes.no) / totalVotes) * 100).toLocaleString()}`;
    const ABSTAIN = `${(
      (Number(votes.abstain) / totalVotes) *
      100
    ).toLocaleString()}`;
    const VETO = `${(
      (Number(votes.no_with_veto) / totalVotes) *
      100
    ).toLocaleString()}`;
    return {
      ratio: { YES, NO, ABSTAIN, VETO },
      tally: {
        YES: votes.yes,
        NO: votes.no,
        VETO: votes.no_with_veto,
        ABSTAIN: votes.abstain,
      },
      totalAmount: totalVotes,
    };
  };

  const getVoteDistribution = (proposal: any) => {
    // getProposalTally(proposalId);
    // const proposal = await getProposalById(proposalId);
    const votes = proposal.final_tally_result;
    const distribution = calculateVoteDistribution(votes);
    return distribution;
  };

  const getVoteDistributionById = async (proposalId: string) => {
    const votes = (await getProposalTally(proposalId)).tally;
    const distribution = calculateVoteDistribution(votes);
    return distribution;
  };

  const getParsedProposalsList = async () => {
    let proposalsList: Array<ILpCardProps> = [];
    const rawProposalsData = await getAllGovProposals();

    rawProposalsData.forEach(async (item: any) => {
      const { localeDateOnly, localeTimeOnly } = parseIsoTimeString(
        item.voting_end_time
      );
      const proposalType = getProposalType(item);
      const voteDistribution = getVoteDistribution(item);
      const newLpListItem: ILpCardProps = {
        proposalId: item.proposal_id,
        proposalTitle: item.content.title,
        endDate: localeDateOnly,
        endTime: localeTimeOnly,
        tags: [chain, proposalType],
        voteDistribution: voteDistribution.ratio,
        status: item.status,
      };
      proposalsList.push(newLpListItem);
    });
    setProposalsList(proposalsList);
    return proposalsList;
  };

  const getLpList = async () => {
    let list: Array<ILpCardProps> = proposalsList;
    if (list?.length === 0) {
      list = await getParsedProposalsList();
    }
    const lpList: Array<ILpCardProps> = list?.filter(
      (proposal) => proposal.status === "PROPOSAL_STATUS_VOTING_PERIOD"
    );
    return lpList;
  };

  const getOpList = async () => {
    let list: Array<ILpCardProps> = proposalsList;

    if (list?.length === 0) {
      list = await getParsedProposalsList();
    }
    const opList: Array<ILpCardProps> = list?.filter(
      (proposal) => proposal.status !== "PROPOSAL_STATUS_VOTING_PERIOD"
    );
    return opList;
  };

  const getParsedProposal = async (id: string) => {
    const rawProposal = await getProposalById(id);
    const totalBonded = await getTotalBondedToken();
    const voteDistribution = await getVoteDistributionById(id);
    const turnout = (
      (Number(voteDistribution.totalAmount) / Number(totalBonded)) *
      100
    ).toLocaleString();
    const voteEndTime = parseIsoTimeString(rawProposal.voting_end_time);
    const voteStartTime = parseIsoTimeString(rawProposal.voting_start_time);
    const parsedProposal = {
      id: rawProposal.proposal_id,
      title: rawProposal.content.title,
      status: rawProposal.status,
      description: rawProposal.content.description,
      voteDistribution,
      votingEndTime: voteEndTime.localeStringFormat,
      votingStartTime: voteStartTime.localeStringFormat,
      totalDeposit: Number(rawProposal.total_deposit[0].amount) / 1000000,
      denom: {
        pretty: getSymbolFromName(chain),
        denom: getDenomFromName(chain),
      },
      turnout,
      threshold: "40",
      quorom: "40",
      yesVotes: voteDistribution.ratio.YES,
      vetoVotes: voteDistribution.ratio.VETO,
    };

    return parsedProposal;
  };

  return {
    getGovProposals,
    getLpList,
    getProposalType,
    getVoteDistribution,
    getOpList,
    getAllGovProposals,
    getProposalById,
    getParsedProposal,
    getTotalBondedToken,
    getVotingPower,
    getUserDelegations,
    getProposalTurnout,
    getParsedProposalsList,
    getUserVote,
  };
};
