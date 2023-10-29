import { Box, Heading, Spinner } from "@chakra-ui/react";
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
  const [isLoading, setIsLoading] = useState(false);

  const { fetchProposalByIdAndName } = useGovernance();

  useEffect(() => {
    fetchProposal();
  }, []);

  const fetchProposal = async () => {
    setIsLoading(true);
    const proposal = await fetchProposalByIdAndName(
      chain as string,
      proposalId as string
    );
    setProposalData(proposal);
    setIsLoading(false);
  };

  return isLoading ? (
    <Spinner width={"3rem"} height="3rem" />
  ) : (
    <Box flexDirection={"column"} display={"flex"} gap={"50px"}>
      <BasicInfo {...proposalData} />
      <VoteSection
        prettyDenom={proposalData?.denom.pretty}
        voteDistribution={proposalData && proposalData.voteDistribution}
        status={proposalData?.status}
      />
      <Overview voteDistribution={proposalData?.voteDistribution.ratio} />
      <OtherDetails
        votingEndTime={proposalData?.votingEndTime}
        votingStartTime={proposalData?.votingStartTime}
      />
    </Box>
  );
};

export default Proposal;
