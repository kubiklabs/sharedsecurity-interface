import Section from "../Layout/Section";
import { Grid, GridItem, Skeleton } from "@chakra-ui/react";
import VpCard from "./VpCard";

const VpSection = () => {
  return (
    <Section
      heading="My Voting Power"
      subtitle="Get to know the value of your vote."
    >
      <Grid
        p={"15px"}
        gap={"20px"}
        gridTemplateColumns={"repeat(auto-fit, minmax(320px, 1fr))"}
      >
        <GridItem>
          <VpCard name="Cosmos" />
        </GridItem>
        <GridItem>
          <VpCard name="Neutron" />
        </GridItem>
        <GridItem>
          <VpCard name="Stride" />
        </GridItem>
      </Grid>
    </Section>
  );
};

export default VpSection;
