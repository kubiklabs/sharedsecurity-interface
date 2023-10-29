import React from "react";
import Section from "../Layout/Section";
import { Box, Flex, Text, Tooltip } from "@chakra-ui/react";
import { IVoteValueProps } from "../../utils/interface";
import { bigSmallTextColorMap, colorVoteMap } from "../../utils/constant";

const Overview = ({ voteDistribution }: any) => {
  return (
    <Section heading="Overview">
      <Box
        display={"flex"}
        my={"10px"}
        width={"100%"}
        height={"5px"}
        borderRadius={"5px"}
        overflow={"hidden"}
      >
        {voteDistribution &&
          Object.keys(voteDistribution).map((vote) => {
            return (
              <Tooltip
                key={colorVoteMap[vote as keyof typeof colorVoteMap].color}
                content={`${vote}:${
                  voteDistribution[vote as keyof IVoteValueProps]
                }%`}
              >
                <Box
                  // my={"10px"}
                  width={`${voteDistribution[vote as keyof IVoteValueProps]}%`}
                  height={"5px"}
                  // borderRadius={"5px"}
                  bg={colorVoteMap[vote as keyof typeof colorVoteMap].color}
                ></Box>
              </Tooltip>
            );
          })}
      </Box>
      {/* <Box
        textAlign={"left"}
        gap={"10px"}
        display={"flex"}
        flexDirection={"column"}
      >
        <Text m={"0"} fontSize={"1.2rem"}>
          Requirements
        </Text>
        <Box>
          <Flex gap={"5px"} alignItems={"center"}>
            <span className="material-symbols-outlined">done</span>{" "}
            <Text>Turnout Threshold is 33.4%. 61.4% have voted</Text>
          </Flex>
          <Flex gap={"5px"} alignItems={"center"}>
            <span className="material-symbols-outlined">done</span>
            <Text>More than 50% have voted 'Yes' </Text>
          </Flex>
          <Flex gap={"5px"} alignItems={"center"}>
            <span className="material-symbols-outlined">done</span>
            <Text>Less than 33% have voted 'Veto' </Text>
          </Flex>
        </Box>
      </Box> */}
    </Section>
  );
};

export default Overview;
