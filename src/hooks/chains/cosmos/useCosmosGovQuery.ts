import axios from "axios";
import { ILpCardProps } from "../../../components/Governance/LpCard";
import { parseIsoTimeString } from "../../../utils/common";
import { useState } from "react";

interface IProposalData {
  proposals: Array<any>;
  pagination: any;
}

export const useCosmosGovQuery = () => {
  const [proposalsList, setProposalsList] = useState<Array<ILpCardProps>>([]);

  const getGovProposals = async () => {
    const response = await axios.get(
      `https://cosmos-api.polkachu.com/cosmos/gov/v1beta1/proposals`
    );
    const proposalsData: IProposalData = response.data;
    // console.log(proposalsData);
    return proposalsData;
  };

  const getAllGovProposals = async () => {
    let allProposalData: any = [];
    const response = await axios.get(
      `https://cosmos-api.polkachu.com/cosmos/gov/v1beta1/proposals`
    );
    let proposalsData: IProposalData = response.data;
    allProposalData = allProposalData.concat(proposalsData.proposals);

    while (proposalsData.pagination.next_key != null) {
      const response = await axios.get(
        `https://cosmos-api.polkachu.com/cosmos/gov/v1beta1/proposals?pagination.key=${proposalsData.pagination.next_key}`
      );
      proposalsData = response.data;
      allProposalData = allProposalData.concat(proposalsData.proposals);
      console.log(allProposalData);
    }
    return allProposalData;
  };

  const getProposalById = async (proposalId: string) => {
    const response = await axios.get(
      `https://cosmos-api.polkachu.com/cosmos/gov/v1beta1/proposals/${proposalId}`
    );
    const proposal = response.data.proposal;
    return proposal;
  };

  const getCosmosTotalBondedToken = async () => {
    const response = await axios.get(
      "https://cosmos-api.polkachu.com/cosmos/staking/v1beta1/pool"
    );
    // console.log(response.data);

    const totalBonded = response.data.pool.bonded_tokens;
    return totalBonded;
  };

  const getCosmosProposalTurnout = async (proposal: any) => {
    const totalBonded = await getCosmosTotalBondedToken();
    const totalVoted = getVoteDistribution(proposal).totalAmount;
    const turnout = (
      (Number(totalVoted) / Number(totalBonded)) *
      100
    ).toLocaleString();
    // console.log(totalBonded, totalVoted, turnout);

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

  const getVoteDistribution = (proposal: any) => {
    const votes = proposal.final_tally_result;
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

  const getProposalsList = async () => {
    let proposalsList: Array<ILpCardProps> = [];
    const rawProposalsData = await getAllGovProposals();

    rawProposalsData.forEach((item: any) => {
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
        tags: ["Cosmos", proposalType],
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
      list = await getProposalsList();
    }
    const lpList: Array<ILpCardProps> = list?.filter(
      (proposal) => proposal.status === "PROPOSAL_STATUS_VOTING_PERIOD"
    );
    return lpList;
  };

  const getOpList = async () => {
    let list: Array<ILpCardProps> = proposalsList;

    if (list?.length === 0) {
      list = await getProposalsList();
    }
    const opList: Array<ILpCardProps> = list?.filter(
      (proposal) => proposal.status !== "PROPOSAL_STATUS_VOTING_PERIOD"
    );
    return opList;
  };

  const getParsedCosmosProposal = async (id: string) => {
    const rawProposal = await getProposalById(id);
    const turnout = await getCosmosProposalTurnout(rawProposal);
    const voteDistribution = getVoteDistribution(rawProposal);
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
        pretty: "ATOM",
        denom: "uatom",
      },
      turnout,
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
    getParsedCosmosProposal,
    getCosmosTotalBondedToken,
  };
};
