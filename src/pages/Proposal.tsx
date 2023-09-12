import { Box, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BasicInfo, { IBasicInfo } from "../components/Proposal/BasicInfo";
import VoteSection from "../components/Proposal/VoteSection";
import Overview from "../components/Proposal/Overview";
import { useGovernance } from "../hooks/useGovernance";
import OtherDetails from "../components/Proposal/OtherDetails";

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
        prettyDenom={proposalData?.denom.pretty}
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
