import {
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  Skeleton,
  Spinner,
  Text,
  Box,
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
    // <Box py={"40px"} px={"60px"} bgColor={"#17131E"} borderRadius={"15px"}>
    <Section
      heading="Live Proposals"
      sideText={`${lpList?.length}/${lpList?.length}`}
      subtitle="All the live proposals"
    >
      <PulseLive left="300px" top="55px" />
      <Grid
        p={"15px"}
        gap={"20px"}
        // justifyContent={"space-evenly"}
        // gridAutoFlow={"column"}
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
                <GridItem id={item.proposalId}>
                  <LpCard {...item} showButtons={false} />
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
    // </Box>
  );
};

export default LpSection;
