import { Flex, Text } from "@chakra-ui/react";
import React from "react";

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
  return (
    <Flex
      p={"30px"}
      borderRadius={"10px"}
      flexDirection={"column"}
      gap={"15px"}
      bg={colorVoteMap[props.option as keyof IColorVoteMap].bg}
      minWidth={"fit-content"}
      _focus={{
        border: `2px solid ${
          colorVoteMap[props.option as keyof IColorVoteMap].color
        }`,
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
        <Text m={"0"}>{props.tokenAmountUnderVote}</Text>
      </Flex>
    </Flex>
  );
};

export default VoteCard;
