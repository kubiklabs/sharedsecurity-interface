import { Grid } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import Section from "../Layout/Section";
import VoteCard from "./VoteCard";
import { useGovernance } from "../../hooks/useGovernance";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { walletState } from "../../context/walletState";

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

const VoteSection = ({ voteDistribution, prettyDenom, status }: any) => {
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
      const vote = await fetchUserVote(chain as string, proposalId as string);
      setUserVote(vote);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserVote();
  }, []);

  return (
    <>
      <Section
        heading="Your Vote"
        subtitle={
          userVote
            ? `You have already voted with ${userVote}.`
            : "Looks like you haven't voted on this proposal"
        }
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
