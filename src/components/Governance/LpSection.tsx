import {
  Center,
  Grid,
  GridItem,
  Heading,
  Spinner,
} from "@chakra-ui/react";

import LpCard, { ILpCardProps } from "./LpCard";
import PulseLive from "@/components/PrettyUI/PulseLive/PulseLive";
import Section from "../Layout/Section";

const LpSection = ({
  lpList,
  isLoading,
}: {
  lpList: Array<ILpCardProps>;
  isLoading?: boolean;
}) => {
  return (
    <Section
      heading="Live Proposals"
      sideText={`${lpList?.length}/${lpList?.length}`}
      subtitle="All the live proposals"
    >
      <PulseLive left="300px" top="55px" />
      <Grid
        p={"15px"}
        gap={"20px"}
        gridTemplateColumns={"repeat(auto-fit, minmax(500px, 1fr))"}
      >
        {isLoading ? (
          <Center>
            <GridItem>
              <Spinner width={"3rem"} height="3rem" />{" "}
            </GridItem>
          </Center>
        ) : null}
        {lpList?.length
          ? lpList.map((item) => {
              return (
                <GridItem id={item.proposalId} key={item.proposalId}>
                  <LpCard {...item} showButtons={false} />
                </GridItem>
              );
            })
          : !isLoading && (
              <GridItem bg={"red.800"}>
                <Heading
                  bg={"rgba(255, 255, 255, 0.05)"}
                  padding={"30px"}
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
