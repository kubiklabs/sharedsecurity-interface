import { Box, Grid } from "@chakra-ui/react";
import React from "react";
import Section from "../Layout/Section";
import VoteCard from "./VoteCard";
import ModalOverlay from "../modal/ModalOverlay";

const DUMMY_VOTE = [
  {
    color: "#409F4E",
    option: "YES",
    votePercentage: "96.11%",
    tokenAmountUnderVote: "12,423,088 STRD",
    bg: "linear-gradient(0deg, rgba(64, 159, 78, 0.10) 0%, rgba(64, 159, 78, 0.10) 100%)",
  },
  {
    color: "#409F4E",
    option: "NO",
    votePercentage: "96.11%",
    tokenAmountUnderVote: "12,423,088 STRD",
    bg: "linear-gradient(0deg, rgba(64, 159, 78, 0.10) 0%, rgba(64, 159, 78, 0.10) 100%)",
  },
  {
    color: "#409F4E",
    option: "VETO",
    votePercentage: "96.11%",
    tokenAmountUnderVote: "12,423,088 STRD",
    bg: "linear-gradient(0deg, rgba(64, 159, 78, 0.10) 0%, rgba(64, 159, 78, 0.10) 100%)",
  },
  {
    color: "#409F4E",
    option: "ABSTAIN",
    votePercentage: "96.11%",
    tokenAmountUnderVote: "12,423,088 STRD",
    bg: "linear-gradient(0deg, rgba(64, 159, 78, 0.10) 0%, rgba(64, 159, 78, 0.10) 100%)",
  },
];

const VoteSection = ({ voteDistribution, prettyDenom }: any) => {
  return (
    <>
      <Section heading="Your Vote">
        <Grid
          p={"15px"}
          gap={"20px"}
          gridTemplateColumns={"repeat(auto-fit, minmax(250px, 1fr))"}
        >
          {voteDistribution &&
            Object.keys(voteDistribution.ratio).map((vote: any) => {
              return (
                <VoteCard
                  tokenAmountUnderVote={voteDistribution.tally[vote] / 1000000}
                  option={vote}
                  value={voteDistribution.ratio[vote]}
                  prettyDenom={prettyDenom}
                />
              );
            })}
        </Grid>
      </Section>
    </>
  );
};

export default VoteSection;
