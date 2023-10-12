import {
  Box,
  Flex,
  Grid,
  GridItem,
  Text,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
} from "@chakra-ui/react";
import React from "react";
import StatDisplay from "../DataDisplay/StatDisplay";

const OtherDetails = ({ votingStartTime, votingEndTime }: any) => {
  return (
    <Grid
      p={"15px"}
      gap={"20px"}
      // justifyContent={"space-evenly"}
      // gridAutoFlow={"column"}
      gridTemplateColumns={"repeat(auto-fit, minmax(100px, 300px))"}
    >
      <GridItem>
        <StatDisplay label={"Voting End Time"} number={votingEndTime || "-"} />
      </GridItem>
      <GridItem>
        <StatDisplay
          label={"Voting Start Time"}
          number={votingStartTime || "-"}
        />
      </GridItem>
    </Grid>
  );
};

export default OtherDetails;
