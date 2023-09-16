import { Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useGovernance } from "../../hooks/useGovernance";
import { useParams } from "react-router-dom";
import LoadingModal from "../loading-modal/LoadingModal";

const colorVoteMap = {
  YES: {
    color: "#409F4E",
    bg: "#409F4E14",
  },
  NO: {
    color: "#BE483A",
    bg: "#BE483A14",
  },
  ABSTAIN: {
    color: "#C88864",
    bg: "#C8886414",
  },
  VETO: {
    color: "#ADACAF",
    bg: "#ADACAF14",
  },
};
type IColorVoteMap = typeof colorVoteMap;

const VoteCard = (props: any) => {
  // const { sendNeutronVote } = useNeutronGovTxn();
  const { sendGovVote } = useGovernance();
  const { chain, proposalId } = useParams();
  const [loading, setLoading] = useState(false);

  const handleSendVote = async () => {
    setLoading(true);
    await sendGovVote(chain as string, proposalId as string, props.option);
    setLoading(false);
  };

  return (
    <>
      <Flex
        onClick={handleSendVote}
        p={"30px"}
        borderRadius={"10px"}
        flexDirection={"column"}
        gap={"15px"}
        bg={colorVoteMap[props.option as keyof IColorVoteMap].bg}
        minWidth={"fit-content"}
        transition={"ease-in-out 500ms"}
        _hover={{
          border: `2px solid ${
            colorVoteMap[props.option as keyof IColorVoteMap].color
          }`,
          cursor: "pointer",
        }}
      >
        <Text
          alignSelf={"flex-start"}
          color={colorVoteMap[props.option as keyof IColorVoteMap].color}
          m={"0"}
          fontSize={"2rem"}
        >
          {props.option}
        </Text>
        <Flex align={"center"} justifyContent={"space-between"}>
          <Text
            fontSize={"1.5rem"}
            color={colorVoteMap[props.option as keyof IColorVoteMap].color}
            m={"0"}
          >
            {props.value}%
          </Text>
          <Text fontSize={"0.9rem"} m={"0"}>
            {props.tokenAmountUnderVote} {props.prettyDenom}
          </Text>
        </Flex>
      </Flex>
      <LoadingModal
        isOpen={loading}
        content={["Voting on the Proposal with option", `${props?.option}`]}
      />
      {/* <ModalOverlay isOpen={loading} onClose={() => setLoading(false)}>
        Txn in Progress...
      </ModalOverlay> */}
    </>
  );
};

export default VoteCard;
