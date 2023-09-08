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
    <Flex alignItems={"end"} gap={"5px"}>
      <Text color={color} m={"0"} fontWeight={"800"} fontSize={"1.2rem"}>
        {bigText}%
      </Text>
      <Text color={color} m={"0"} fontSize={"0.8rem"}>
        {smallText}
      </Text>
    </Flex>
  );
};

export default BigSmallText;
