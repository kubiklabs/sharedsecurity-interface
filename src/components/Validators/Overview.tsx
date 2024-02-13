import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import StatDisplay from "../DataDisplay/StatDisplay";
import Section from "../Layout/Section";
import { featuredOverviewValidators } from "../../utils/constant";

const Overview = ({
  active,
  total,
  averageComm,
}: {
  active: string;
  total: string;
  averageComm: string;
}) => {
  return (
    /*  <Flex gap={"25px"} flexWrap={"wrap"}>
      <StatDisplay label={"Active"} number={active || "-"} />
      <StatDisplay label={"Allocated"} number={total || "-"} />
      <StatDisplay label={"Average Commission"} number={averageComm || "-"} />
      <StatDisplay label={"Soft opt-out: Neutron/Stride"} number={"5%"} />
    </Flex> */
    <Section heading="Featured" subtitle="Our top picks to get you started">
      <Flex justifyContent={"space-between"} flexWrap={"wrap"} rowGap={"15px"}>
        {featuredOverviewValidators.map((data, index) => {
          return (
            //<StatDisplay key={index} label={data.name} number={data.value} />
            <Flex
              direction={"column"}
              background={"#1E1A25"}
              borderRadius={"5px"}
              gap={"5px"}
              py={"15px"}
              px={"20px"}
              key={index}
              fontWeight={400}
            >
              <Text fontSize={"14px"} color={"#B3B3B3"}>
                {data.name}
              </Text>
              <Text
                textAlign={"left"}
                fontSize={"20px"}
                color="rgba(217, 217, 217, 0.9)"
              >
                {data.name === "Allocated Validators"
                  ? `${total}`
                  : data.name === "AVG. Commission"
                  ? `${averageComm}`
                  : data.value}
              </Text>
            </Flex>
          );
        })}
      </Flex>
    </Section>
  );
};

export default Overview;
