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
      <Flex gap={"25px"} flexWrap={"wrap"}>
        <StatDisplay label={"Active"} number={active || "-"} />
        <StatDisplay label={"Allocated"} number={total || "-"} />
        <StatDisplay label={"Average Commission"} number={averageComm || "-"} />
        <StatDisplay label={"Soft opt-out: Neutron/Stride"} number={"5%"} />
        <StatDisplay label={"On-chain Commission"} number={"10.64%"} />
        <StatDisplay label={"Nakamoto Coefficient"} number={"6.775"} />
        <StatDisplay label={"Meanful Coefficient"} number={"24.597"} />
      </Flex>
    </Section>
  );
};

export default Overview;
