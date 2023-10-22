import {
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  Skeleton,
  Spinner,
  Text,
} from "@chakra-ui/react";
import Section from "../Layout/Section";
import LpCard, { ILpCardProps } from "./LpCard";
import { compareProposals } from "../../utils/common";
import PulseLive from "../PrettyUI/PulseLive/PulseLive";

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
    >
      <PulseLive left="325px" top="19px" />
      <Grid
        p={"15px"}
        gap={"20px"}
        // justifyContent={"space-evenly"}
        // gridAutoFlow={"column"}
        gridTemplateColumns={"repeat(auto-fit, minmax(550px, 1fr))"}
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
                <GridItem id={item.proposalId}>
                  <LpCard {...item} />
                </GridItem>
              );
            })
          : !isLoading && (
              <GridItem bg={"red.800"}>
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
