import {  Center, Spinner, Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import BasicInfo from "@/components/Proposal/BasicInfo";
import VoteSection from "@/components/Proposal/VoteSection";
import Overview from "@/components/Proposal/Overview";
import { useGovernance } from "@/hooks/useGovernance";
import OtherDetails from "@/components/Proposal/OtherDetails";
import Requirements from "@/components/Proposal/Requirements";
import ForumLink from "@/components/Proposal/ForumLink";
import Section from "@/components/Layout/Section";
import BrowserTitle from "@/components/BrowserTitle/BrowserTitle";

const Proposal = () => {
  const data = useParams();
  const chain = data?.chain as string;
 const proposalId = data?.proposalId as string;
  const [proposalData, setProposalData] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  const { fetchProposalByIdAndName } = useGovernance();

  useEffect(() => {
    if (chain && proposalId) {
      fetchProposal();
    }
  }, [chain, proposalId]);

  const fetchProposal = async () => {
    setIsLoading(true);
    const proposal = await fetchProposalByIdAndName(chain as string, proposalId as string);
    setProposalData(proposal);
    setIsLoading(false);
  };

  return (
    <>
    <BrowserTitle title="Proposals" />
    {isLoading ? (
      <Center>
      <Spinner width={"3rem"} height="3rem" />
      </Center>
      ) : (
        <Stack gap={"50px"}>
          {proposalData && (
            <BasicInfo
              id={proposalData.id}
              title={proposalData.title}
              status={proposalData.status}
              description={proposalData.description}
              turnout={proposalData.turnout}
              threshold={proposalData.threshold}
              quorom={proposalData.quorom}
              vetoVotes={proposalData.vetoVotes}
              yesVotes={proposalData.yesVotes}
              chain={chain as string}
            />
          )}
          <VoteSection
            prettyDenom={proposalData?.denom.pretty}
            voteDistribution={proposalData && proposalData.voteDistribution}
            status={proposalData?.status}
            votingEndTime={proposalData?.votingEndTime}
            chain={chain}
            proposalId={proposalId}
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
      )}
    </>
  );
};

export default Proposal;
