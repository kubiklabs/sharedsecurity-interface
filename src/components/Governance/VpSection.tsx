import Section from "../Layout/Section";
import { Grid, GridItem } from "@chakra-ui/react";
import VpCard, { IVpCardProps } from "./VpCard";

const VpSection = ({ vpList }: { vpList: Array<IVpCardProps> }) => {
  return (
    <Section
      heading="My Voting Power"
      sideText="2/2"
      subtitle="Get to know the value of your vote."
    >
      <Grid
        p={"15px"}
        gap={"20px"}
        // justifyContent={"space-evenly"}
        // gridAutoFlow={"column"}
        gridTemplateColumns={"repeat(auto-fit, minmax(320px, 1fr))"}
      >
        {vpList.map((item) => {
          return (
            <GridItem>
              <VpCard {...item} />
            </GridItem>
          );
        })}
      </Grid>
    </Section>
  );
};

export default VpSection;
