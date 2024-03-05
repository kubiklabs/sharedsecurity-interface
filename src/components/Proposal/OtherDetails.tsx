import {
  Grid,
  GridItem,
  Text,
  Stack,
} from "@chakra-ui/react";
import React from "react";
import StatDisplay from "@/components/DataDisplay/StatDisplay";

const OtherDetails = ({
  votingStartTime,
  votingEndTime,
  totalDeposit,
  denom,
}: any) => {
  return (
    <Stack gap={"10px"}>
      <Text fontSize={"24px"} textAlign={"left"}>
        Other Details
      </Text>
      <Grid
        p={"15px"}
        gap={"20px"}
        gridTemplateColumns={"repeat(auto-fit, minmax(100px, 300px))"}
      >
        <GridItem>
          <StatDisplay
            label={"Voting End Time"}
            number={votingEndTime || "-"}
          />
        </GridItem>
        <GridItem>
          <StatDisplay
            label={"Voting Start Time"}
            number={votingStartTime || "-"}
          />
        </GridItem>
        <GridItem>
          <StatDisplay
            label={"Total Deposit"}
            number={totalDeposit || "-"}
            numberTitle={denom}
          />
        </GridItem>
      </Grid>
    </Stack>
  );
};

export default OtherDetails;
