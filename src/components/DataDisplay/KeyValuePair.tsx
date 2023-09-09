import { Box, Flex, Text } from "@chakra-ui/react";
import React from "react";

const KeyValuePair = ({
  keyField,
  value,
}: {
  keyField: string;
  value: string;
}) => {
  return (
    <Flex fontSize={"1.2rem"} gap={"5px"}>
      <Text>{keyField}</Text>
      <Text>:</Text>
      <Text>{value}</Text>
    </Flex>
  );
};

export default KeyValuePair;
