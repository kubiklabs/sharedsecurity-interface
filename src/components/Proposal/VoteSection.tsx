import { Box, Flex, Grid, Text } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import Section from "../Layout/Section";
import VoteCard from "./VoteCard";
import { useGovernance } from "../../hooks/useGovernance";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { walletState } from "../../context/walletState";
import { getCommonVoteOption } from "../../utils/common";
import { calculateDaysLeft } from "../../utils/common";

const VoteSection = ({
  voteDistribution,
  prettyDenom,
  status,
  votingEndTime,
}: any) => {
  console.log(votingEndTime);

  const wallet = useRecoilValue(walletState);
  const { fetchUserVote } = useGovernance();
  const { chain, proposalId } = useParams();
  const [userVote, setUserVote] = useState("");
  const chainAddress = useRef<string>("");

  useEffect(() => {
    const address = wallet[chain as keyof typeof wallet];
    chainAddress.current = address as string;
  }, [wallet]);

  const getUserVote = async () => {
    try {
      let vote = await fetchUserVote(chain as string, proposalId as string);
      vote = getCommonVoteOption(vote);

      setUserVote(vote);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!wallet.isLoggedIn) setUserVote("");
    else getUserVote();
  }, [wallet.isLoggedIn]);

  return (
    <Section
      heading="Your Vote"
      subtitle={
        userVote
          ? `You have voted with ${userVote}.`
          : "Looks like you haven't voted on this proposal"
      }
      sideText={
        (status === "PROPOSAL_STATUS_VOTING_PERIOD" || status === "open") && (
          <Text fontSize={"1.2rem"} color={"#A9A8AA"}>
            Voting ends in {calculateDaysLeft(votingEndTime)} days
          </Text>
        )
      }
      sideTextPos="apart"
    >
      <Grid
        p={"15px"}
        gap={"20px"}
        gridTemplateColumns={"repeat(auto-fit, minmax(250px, 1fr))"}
      >
        {voteDistribution &&
          Object.keys(voteDistribution.ratio).map((vote: any) => {
            return (
              <VoteCard
                disable={
                  status &&
                  status !== "PROPOSAL_STATUS_VOTING_PERIOD" &&
                  status !== "open"
                }
                vote={userVote}
                tokenAmountUnderVote={voteDistribution.tally[vote] / 1000000}
                option={vote}
                value={voteDistribution.ratio[vote]}
                prettyDenom={prettyDenom}
              />
            );
          })}
      </Grid>
    </Section>
  );
};

export default VoteSection;
