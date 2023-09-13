import {
  CosmWasmClient,
  SigningCosmWasmClient,
} from "@cosmjs/cosmwasm-stargate";
import { useEffect, useRef, useState } from "react";
import { useChainInfo } from "../../useChainInfo";
import { neutronSingleProposal } from "../../../config/chains/Neutron/contracts/SingleProposalModule";
import { parseNanosecondTimeString, sleep } from "../../../utils/common";
import { ILpCardProps } from "../../../components/Governance/LpCard";

export const useNeutronQuery = () => {
  const { getRpcUrl } = useChainInfo("neutron-1");
  const [queryClient, setQueryClient] = useState<CosmWasmClient>();
  const [proposals, setProposals] = useState<any[]>([]);

  useEffect(() => {
    createQueryClient();
  }, []);

  const createQueryClient = async () => {
    const queryClient = await CosmWasmClient.connect(getRpcUrl());
    // console.log(queryClient);

    setQueryClient(queryClient);
    return queryClient;
  };

  const getNeutronProposals = async () => {
    let client = queryClient;
    if (!client) {
      client = await createQueryClient();
    }

    const response = await client?.queryContractSmart(
      neutronSingleProposal.at,
      {
        list_proposals: {},
      }
    );
    setProposals(response.proposal);
    // console.log(response);
    return response.proposals;
  };

  const getNeutronProposalById = async (proposalId: string) => {
    let client = queryClient;
    if (!client) {
      client = await createQueryClient();
    }

    const response = await client?.queryContractSmart(
      neutronSingleProposal.at,
      {
        proposal: { proposal_id: Number(proposalId) },
      }
    );

    // console.log(response);
    return response;
  };

  const calculateVoteDistribution = (votes: any) => {
    type Ivotes = typeof votes;
    let totalVotes = 0;
    Object.values(votes).map((vote) => {
      totalVotes += Number(vote);
    });
    return {
      ratio: {
        YES: ((Number(votes["yes"]) / totalVotes) * 100).toLocaleString(),
        NO: ((Number(votes["no"]) / totalVotes) * 100).toLocaleString(),
        ABSTAIN: (
          (Number(votes["abstain"]) / totalVotes) *
          100
        ).toLocaleString(),
        VETO: (
          ((Number(votes["veto"]) || 0) / totalVotes) *
          100
        ).toLocaleString(),
      },
      tally: {
        YES: votes.yes,
        NO: votes.no,
        ABSTAIN: votes.abstain,
      },
      totalVotes,
    };
  };

  const calculateNeutronProposalTurnout = (proposal: any) => {
    let totalVotes = 0;
    for (let vote in proposal.votes) {
      totalVotes += Number(proposal.votes[vote]);
    }
    return ((totalVotes / Number(proposal.total_power)) * 100).toLocaleString();
  };

  const getNeutronProposalsList = async () => {
    let parsedProposals: ILpCardProps[] = [];
    let rawProposals: any[] = proposals;
    // console.log(rawProposals);

    if (!rawProposals || !rawProposals?.length) {
      console.log("yes");

      rawProposals = await getNeutronProposals();
    }
    // console.log(rawProposals);

    (rawProposals as Array<any>)?.forEach((proposal) => {
      const { localeDateOnly, localeTimeOnly } = parseNanosecondTimeString(
        proposal.proposal.expiration.at_time
      );
      const { ratio } = calculateVoteDistribution(proposal.proposal.votes);
      const parsedProposal: ILpCardProps = {
        proposalId: proposal.id,
        proposalTitle: proposal.proposal.title,
        tags: ["Neutron"],
        status: proposal.proposal.status,
        voteDistribution: ratio,
        endDate: localeDateOnly,
        endTime: localeTimeOnly,
      };
      parsedProposals.push(parsedProposal);
    });
    // console.log(parsedProposals);

    return parsedProposals;
  };

  const getNeutronLpList = async () => {
    const lpList = (await getNeutronProposalsList()).filter(
      (proposal) => proposal.status === "open"
    );
    return lpList;
  };

  const getNeutronOpList = async () => {
    const opList = (await getNeutronProposalsList()).filter(
      (proposal) => proposal.status !== "open"
    );
    return opList;
  };

  const getParsedNeutronProposal = async (proposalId: string) => {
    const { id, proposal } = await getNeutronProposalById(proposalId);
    const turnout = calculateNeutronProposalTurnout(proposal);
    const voteDistribution = calculateVoteDistribution(proposal.votes);
    const { localeStringFormat } = parseNanosecondTimeString(
      proposal.expiration.at_time
    );
    const parsedProposal = {
      id,
      title: proposal.title,
      status: proposal.status,
      description: proposal.description,
      voteDistribution,
      votingEndTime: localeStringFormat,
      totalDeposit: null,
      denom: {
        pretty: "NTRN",
        denom: "untrn",
      },
      turnout,
    };
    return parsedProposal;
  };

  return {
    createQueryClient,
    getNeutronProposals,
    getNeutronProposalsList,
    getNeutronLpList,
    getNeutronOpList,
    getParsedNeutronProposal,
  };
};
