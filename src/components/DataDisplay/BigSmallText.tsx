import { Flex, Text } from "@chakra-ui/react";
import React from "react";

const BigSmallText = ({
  bigText,
  smallText,
  color,
}: {
  bigText: string;
  smallText: string;
  color: string;
}) => {
  return (
    <Flex alignItems={"end"} gap={"2px"}>
      <Text color={color} m={"0"} fontWeight={"800"} fontSize={"0.9rem"}>
        {bigText}%
      </Text>
      <Text color={color} m={"0"} fontSize={"0.9rem"}>
        {smallText}
      </Text>
    </Flex>
  );
};

export default BigSmallText;
