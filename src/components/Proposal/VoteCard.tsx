import { Flex, Text } from "@chakra-ui/react";
import React from "react";

const VoteCard = (props: any) => {
  return (
    <Flex
      p={"30px"}
      borderRadius={"10px"}
      flexDirection={"column"}
      gap={"15px"}
      bg={props.bg}
      minWidth={"fit-content"}
      _focus={{
        border: `2px solid ${props.color}`,
      }}
    >
      <Text
        alignSelf={"flex-start"}
        color={props.color}
        m={"0"}
        fontSize={"2rem"}
      >
        {props.option}
      </Text>
      <Flex align={"center"} justifyContent={"space-between"}>
        <Text fontSize={"1.5rem"} color={props.color} m={"0"}>
          {props.votePercentage}
        </Text>
        <Text m={"0"}>{props.tokenAmountUnderVote}</Text>
      </Flex>
    </Flex>
  );
};

export default VoteCard;
