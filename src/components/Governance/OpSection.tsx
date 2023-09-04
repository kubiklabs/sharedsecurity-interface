import React from "react";
import Section from "../Layout/Section";
import { Button, Flex, Grid, GridItem, Input } from "@chakra-ui/react";
import LpCard, { ILpCardProps } from "./LpCard";

const OpSection = ({ lpList }: { lpList: Array<ILpCardProps> }) => {
  return (
    <Section heading="Other Proposals" sideText="122/122">
      <Flex px={"15px"} justifyContent={"space-between"}>
        <Input
          placeholder="Search Proposals by name or Id....."
          size="lg"
          height={"50px"}
          borderRadius={"5px"}
          border={"none"}
          px={"15px"}
          width={"500px"}
          bg={"rgba(255, 255, 255, 0.05)"}
        />
        <Flex gap={"15px"} alignItems={"center"}>
          <Button>My Votes</Button>
          <span
            style={{ fontVariationSettings: "'FILL' 1", fontSize: "2rem" }}
            className="material-symbols-outlined"
          >
            widgets
          </span>
        </Flex>
      </Flex>
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

export default OpSection;
