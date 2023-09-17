import React from "react";
import Section from "../Layout/Section";
import { Box, Card, CardBody, Flex, Text } from "@chakra-ui/react";

const scrollbarStyle = {
  "::-webkit-scrollbar": {
    width: "1px",
  },
  "::-webkit-scrollbar-thumb": {
    width: "20px",
    // background: "gray",
    borderRadius: "10px",
    // borderColor: "black",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "gray.400",
  },
};

const DUMMY = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const Featured = () => {
  return (
    <Section heading="Featured" subtitle="Out top picks to get you started">
      <Flex>
        <Flex overflowX={"scroll"} sx={scrollbarStyle} gap={"20px"}>
          {DUMMY.map((item) => {
            return (
              <Card
                minH={"200px"}
                minW={"100px"}
                bg={"rgba(255, 255, 255, 0.05)"}
                padding={"30px"}
                // paddingY={"20px"}
                borderRadius={"10px"}
              >
                <CardBody>
                  <Text>{item}</Text>
                </CardBody>
              </Card>
            );
          })}
        </Flex>
      </Flex>
    </Section>
  );
};

export default Featured;
