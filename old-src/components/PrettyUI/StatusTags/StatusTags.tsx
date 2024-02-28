import { Tag, TagLeftIcon, TagLabel, Spinner } from "@chakra-ui/react";
import React from "react";
import PulseLive from "../PulseLive/PulseLive";

const StatusTags = ({ status }: any) => {
  return (
    <Tag
      fontSize={"14px"}
      gap={"10px"}
      size={"lg"}
      variant="solid"
      colorScheme="orange"
      bg={status?.pretty === "Vote Now" ? "#D97807" : status?.bg}
    >
      <TagLabel>
        {status?.pretty === "Vote Now" ? "Voting in Progress" : status?.pretty}
      </TagLabel>
      {status?.pretty === "Vote Now" ? (
        <Spinner speed="1.5s" color="white.500" emptyColor="orange" />
      ) : null}
    </Tag>
  );
};

export default StatusTags;
