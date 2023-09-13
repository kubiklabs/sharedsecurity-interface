import { Flex, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import Section from "../Layout/Section";
import LpCard, { ILpCardProps } from "./LpCard";
import { compareProposals } from "../../utils/common";

const LpSection = ({ lpList }: { lpList: Array<ILpCardProps> }) => {
  return (
    <Section heading="Live Proposals" sideText="2/2">
      <Grid
        p={"15px"}
        gap={"20px"}
        // justifyContent={"space-evenly"}
        // gridAutoFlow={"column"}
        gridTemplateColumns={"repeat(auto-fit, minmax(485px, 1fr))"}
      >
        {lpList.length ? (
          lpList.sort(compareProposals).map((item) => {
            return (
              <GridItem id={item.proposalId}>
                <LpCard {...item} />
              </GridItem>
            );
          })
        ) : (
          <GridItem>
            <Heading
              bg={"rgba(255, 255, 255, 0.05)"}
              padding={"30px"}
              // paddingY={"20px"}
              borderRadius={"10px"}
            >
              There are no active proposals!
            </Heading>
          </GridItem>
        )}
      </Grid>
    </Section>
  );
};

export default LpSection;
