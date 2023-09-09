import React from "react";
import Section from "../Layout/Section";
import { Box, Flex, Text } from "@chakra-ui/react";
import KeyValuePair from "../DataDisplay/KeyValuePair";

export interface IBasicInfo {
  id: string;
  title: string;
  status: string;
  description: string;
}

const scrollbarStyle = {
  "&::-webkit-scrollbar": {
    width: "5px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "gray",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "gray.400",
  },
};

const BasicInfo = ({ id, title, status, description }: IBasicInfo) => {
  return (
    <Section heading={`#${id}. ${title}`}>
      <Flex flexDirection={"column"}>
        <Flex gap={"10px"} justifyContent={"space-between"} width={"100%"}>
          <KeyValuePair keyField="Current Status" value={status} />
          <KeyValuePair keyField="Turnout/Quorom" value="61.8%/33.4%" />
          <KeyValuePair keyField="Proposal expected to" value="PASS" />
        </Flex>
        <Flex
          fontSize={"1.2rem"}
          alignItems={"flex-start"}
          flexDirection={"column"}
        >
          <Text>Description</Text>
          <Box
            bg={"rgba(255, 255, 255, 0.10)"}
            maxH={"300px"}
            overflowY={"scroll"}
            px={"25px"}
            borderRadius={"15px"}
            sx={scrollbarStyle}
            textAlign={"justify"}
            color={"#bfbfbf"}
          >
            <Text fontSize={"1.1rem"}>{description}</Text>
          </Box>
        </Flex>
      </Flex>
    </Section>
  );
};

export default BasicInfo;
