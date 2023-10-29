import { Flex } from "@chakra-ui/react";
import React from "react";
import StatDisplay from "../DataDisplay/StatDisplay";

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
    <Flex gap={"25px"} flexWrap={"wrap"}>
      <StatDisplay label={"Active"} number={active || "-"} />
      <StatDisplay label={"Allocated"} number={total || "-"} />
      <StatDisplay label={"Average Commission"} number={averageComm || "-"} />
    </Flex>
  );
};

export default Overview;
