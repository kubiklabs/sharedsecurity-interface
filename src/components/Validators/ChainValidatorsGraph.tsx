import Section from "../Layout/Section";
import React from "react";
import { Box, Flex, Text } from "@chakra-ui/react";
import AreaGraph from "../Graphs and Chart/AreaGraph";

const ChainValidatorsGraph = () => {
  return (
    <Section
      heading="Chain Centrization"
      subtitle="Our top picks to get you started"
    >
      <DummyChart />
    </Section>
  );
};

export default ChainValidatorsGraph;

const DummyChart = () => {

  const data = [
    { month: "January", value: 65 },
    { month: "February", value: 59 },
    { month: "March", value: 80 },
    { month: "April", value: 81 },
    { month: "May", value: 56 },
    { month: "June", value: 55 },
    { month: "July", value: 40 },
  ];


  return (
    <Box position="relative" width={"100%"} pos={"relative"}>
      <Box width="full" height="300px" margin="20px auto" position={"relative"}>
        <Flex justifyContent={"flex-end"} position={"absolute"} right={'15px'} top={"20px"} zIndex={40}>
          <Box
            paddingX={"23px"}
            paddingY={"12px"}
            borderWidth={"1px"}
            borderColor={"#37343D"}
            borderRadius={"5px"}
            mr={"20px"}
            position="absolute"
            whiteSpace={"nowrap"}
          ><Text>25 Meanfuls</Text></Box>
        </Flex>
        <AreaGraph lineData={data} colors={["#C88864"]} xKey={"month"} yKey={["value"]} />
      </Box>
    </Box>
  );
};
