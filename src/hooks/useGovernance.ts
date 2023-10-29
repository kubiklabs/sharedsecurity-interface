import { useRecoilValue, useSetRecoilState } from "recoil";
import { useCosmosGovQuery } from "./chains/cosmos/useCosmosGovQuery";
import { useCosmosGovTxn } from "./chains/cosmos/useCosmosGovTxn";
import { useNeutronGovQuery } from "./chains/neutron/useNeutronGovQuery";
import { useNeutronGovTxn } from "./chains/neutron/useNeutronGovTxn";
import { useStrideGovQuery } from "./chains/stride/useStrideGovQuery";
import { useStrideGovTxn } from "./chains/stride/useStrideGovTxn";
import { walletState } from "../context/walletState";
import { userVpState } from "../context/userVpState";

export const useGovernance = () => {
  const { Cosmos, Neutron, Stride, isLoggedIn } = useRecoilValue(walletState);
  const setUserVp = useSetRecoilState(userVpState);
  const {
    getParsedCosmosProposal,
    getCosmosTotalBondedToken,
    getCosmosVotingPower,
    getCosmosUserVote,
  } = useCosmosGovQuery();
  const {
    getParsedNeutronProposal,
    getNeutronVotingPower,
    getNeutronUserVote,
  } = useNeutronGovQuery();
  const { getParsedStrideProposal, getStrideVotingPower, getStrideUserVote } =
    useStrideGovQuery();
  const { sendCosmosVote, getCosmosAddressSigner } = useCosmosGovTxn();
  const { sendStrideVote, getStrideAddressSigner } = useStrideGovTxn();
  const { sendNeutronVote, getNeutronAddressSigner } = useNeutronGovTxn();

  const fetchAllUserVp = async () => {
    if (!isLoggedIn) return;
    const cosmosVp = await getCosmosVotingPower(Cosmos as string);
    const neutronVp = await getNeutronVotingPower(Neutron as string);
    const strideVp = await getStrideVotingPower(Stride as string);
    setUserVp({
      Cosmos: cosmosVp,
      Neutron: neutronVp,
      Stride: strideVp,
    });
  };

  const fetchProposalByIdAndName = async (name: string, id: string) => {
    switch (name) {
      case "Cosmos":
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

  const fetchVotingPower = async (name: string) => {
    switch (name) {
      case "Cosmos":
        {
          const { address } = await getCosmosAddressSigner();
          return await getCosmosVotingPower(address);
        }
        break;
      case "Stride":
        {
          const { address } = await getStrideAddressSigner();
          return await getStrideVotingPower(address);
        }
        break;
      case "Neutron": {
        const { address } = await getNeutronAddressSigner();
        return await getNeutronVotingPower(address);
      }

      default:
        break;
    }
  };

  const fetchUserVote = async (name: string, id: string) => {
    switch (name) {
      case "Cosmos":
        return await getCosmosUserVote(id);

      case "Stride":
        return await getStrideUserVote(id);

      case "Neutron":
        return await getNeutronUserVote(id);

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
  return {
    fetchProposalByIdAndName,
    fetchTotalBondedToken,
    sendGovVote,
    fetchVotingPower,
    fetchUserVote,
    fetchAllUserVp,
  };
};
