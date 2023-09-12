import { Box, Flex, Grid, GridItem, Text } from "@chakra-ui/react";
import React from "react";

const OtherDetails = ({ votingStartTime, votingEndTime }: any) => {
  return (
    <Grid
      p={"15px"}
      gap={"20px"}
      // justifyContent={"space-evenly"}
      // gridAutoFlow={"column"}
      gridTemplateColumns={"repeat(auto-fit, minmax(100px, 200px))"}
    >
      <GridItem>
        <Flex flexDirection={"column"}>
          <Text m={"0"}>Voting Start Time</Text>
          <Text>{votingStartTime || "-"}</Text>
        </Flex>
      </GridItem>
      <GridItem>
        <Flex flexDirection={"column"}>
          <Text m={"0"}>Voting End Time</Text>
          <Text>{votingEndTime}</Text>
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default OtherDetails;
