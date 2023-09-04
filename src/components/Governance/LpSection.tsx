import { Grid, GridItem } from "@chakra-ui/react";
import Section from "../Layout/Section";
import LpCard, { ILpCardProps } from "./LpCard";

const LpSection = ({ lpList }: { lpList: Array<ILpCardProps> }) => {
  return (
    <Section heading="Live Proposals" sideText="2/2">
      <Grid
        p={"15px"}
        gap={"20px"}
        // justifyContent={"space-evenly"}
        // gridAutoFlow={"column"}
        gridTemplateColumns={"repeat(auto-fit, minmax(426px, 1fr))"}
      >
        {lpList.map((item) => {
          return (
            <GridItem id={item.proposalId}>
              <LpCard {...item} />
            </GridItem>
          );
        })}
      </Grid>
    </Section>
  );
};

export default LpSection;
