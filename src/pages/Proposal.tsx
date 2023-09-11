import { Box, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BasicInfo, { IBasicInfo } from "../components/Proposal/BasicInfo";
import VoteSection from "../components/Proposal/VoteSection";
import Overview from "../components/Proposal/Overview";
import { useGovernance } from "../hooks/useGovernance";
import OtherDetails from "../components/Proposal/OtherDetails";

const DUMMY_PROPOSAL: IBasicInfo = {
  id: "821",
  title: "Stride v14 Software Release",
  status: "PASSED",
  description:
    "The cosmos hub has an elegant method for dealing with spam, known as veto. It deals with genuine spam proposals very well. But what does it mean under the hood? Well, what it means under the hood is that you vote for no and you vote for veto at the same time, you’re making two votes. If the tally for veto reaches 33%, the deposit on the proposal is burned and the proposal automatically fails.\n\nSince there is absolutely no way to mandate a definition of spam and everybody is going to interpret that differently and it makes no sense whatsoever to argue about that, I propose that we nullify proposal 75, AND free the authors of governance proposals from writing tedious vote options because those are defined very well in the software. Luckily, our community is more than intelligent enough to interpret on their own, what the vote options do, and the documentation of the vote options is highly effective.\n\nFinally, I believe that it makes sense to require only explaining the yes option, as doing otherwise can land a punter in hot water.\n\nTherefore, to make governance simpler in all ways, and increase participation in governance, and remove the crazy burn two sticks of incense and say 10 hail Marys before approaching Cosmos hub governance to save thyself from Gaia’s proceduralist faction, we should do the logical thing, and require only that YES, be defined. All other vote options are defined by the underlying software and its documentation.\n\nvote YES to nullify proposal 75, require that YES be defined, and use all other vote options as described by the cosmos-sdk.\n\n\n\n\n\n",
};

const Proposal = () => {
  const { chain, proposalId } = useParams();
  const [proposalData, setProposalData] = useState<any>();

  const { fetchProposalByIdAndName } = useGovernance();

  useEffect(() => {
    fetchProposal();
  }, []);

  const fetchProposal = async () => {
    const proposal = await fetchProposalByIdAndName(
      chain as string,
      proposalId as string
    );
    setProposalData(proposal);
    console.log(proposal);
  };

  return (
    <Box flexDirection={"column"} display={"flex"} gap={"20px"}>
      {/* {chain} */}
      {/* {proposalId} */}
      <BasicInfo {...proposalData} />
      <VoteSection
        voteDistribution={proposalData && proposalData.voteDistribution}
      />
      <Overview />
      <OtherDetails
        votingEndTime={proposalData?.votingEndTime}
        votingStartTime={proposalData?.votingStartTime}
      />
    </Box>
  );
};

export default Proposal;
