import { Box, Stack, Text, Tooltip } from "@chakra-ui/react";
import { IVoteValueProps } from "@/utils/interface";
import {  colorVoteMap } from "@/utils/constant";

const Overview = ({ voteDistribution }: any) => {
  return (
    <Stack gap="10px">
      <Text fontSize={"24px"} textAlign={"left"}>
        Overview
      </Text>
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
                  width={`${voteDistribution[vote as keyof IVoteValueProps]}%`}
                  height={"5px"}
                  bg={colorVoteMap[vote as keyof typeof colorVoteMap].color}
                ></Box>
              </Tooltip>
            );
          })}
      </Box>
    </Stack>
  );
};

export default Overview;
