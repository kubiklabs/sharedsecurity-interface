import { Box, Heading, Spinner, Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BasicInfo, { IBasicInfo } from "../components/Proposal/BasicInfo";
import VoteSection from "../components/Proposal/VoteSection";
import Overview from "../components/Proposal/Overview";
import { useGovernance } from "../hooks/useGovernance";
import OtherDetails from "../components/Proposal/OtherDetails";
import Requirements from "../components/Proposal/Requirements";
import ForumLink from "../components/Proposal/ForumLink";
import Section from "../components/Layout/Section";

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
    console.log(proposal);
    setProposalData(proposal);
    setIsLoading(false);
  };

  return isLoading ? (
    <Spinner width={"3rem"} height="3rem" />
  ) : (
    <Stack gap={"50px"}>
      <BasicInfo {...proposalData} />
      <VoteSection
        prettyDenom={proposalData?.denom.pretty}
        voteDistribution={proposalData && proposalData.voteDistribution}
        status={proposalData?.status}
        votingEndTime={proposalData?.votingEndTime}
      />
      <Section gap="40px">
        <Overview voteDistribution={proposalData?.voteDistribution.ratio} />
        <Requirements
          turnout={proposalData?.turnout}
          quorom={proposalData?.quorom}
          yesVotes={proposalData?.yesVotes}
          vetoVotes={proposalData?.vetoVotes}
        />
        <OtherDetails
          votingEndTime={proposalData?.votingEndTime}
          votingStartTime={proposalData?.votingStartTime}
          totalDeposit={proposalData?.totalDeposit}
          denom={proposalData?.denom?.pretty}
        />
        <ForumLink redirectLink="/" />
      </Section>
    </Stack>
  );
};

export default Proposal;
