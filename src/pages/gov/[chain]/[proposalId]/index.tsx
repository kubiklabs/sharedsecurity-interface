/* eslint-disable react-hooks/exhaustive-deps */

import { Box, Center, Heading, Spinner, Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BasicInfo, { IBasicInfo } from "@/components/Proposal/BasicInfo";
import VoteSection from "@/components/Proposal/VoteSection";
import Overview from "@/components/Proposal/Overview";
import { useGovernance } from "@/hooks/useGovernance";
import OtherDetails from "@/components/Proposal/OtherDetails";
import Requirements from "@/components/Proposal/Requirements";
import ForumLink from "@/components/Proposal/ForumLink";
import Section from "@/components/Layout/Section";

const Proposal = () => {
  const data = useParams();

  const chain = data?.chain as string;
 const proposalId = data?.proposalId as string;
  console.log(chain, proposalId,"chain, proposalId");
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
    <Center>
    <Spinner width={"3rem"} height="3rem" />
    </Center>
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
