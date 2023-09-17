import React from "react";
import Section from "../Layout/Section";
import { Stack, Tab, TabList, Tabs } from "@chakra-ui/react";
import CustomTable from "../DataDisplay/CustomTable";

const data = [
  {
    DApp: "Lido",
    Tags: ["Liquid Staking", "Cosmos"],
    TVL: "$13.9b",
    Fee: "$1.47m",
    Revenue: "$146,251",
    Volume: "-",
  },
  // {
  //   DApp: "Lido",
  //   Tags: ["Liquid Staking", "Cosmos"],
  //   TVL: "$13.9b",
  //   Fee: "$1.47m",
  //   Revenue: "$146,251",
  //   Volume: "-",
  // },
  // {
  //   DApp: "Lido",
  //   Tags: ["Liquid Staking", "Cosmos"],
  //   TVL: "$13.9b",
  //   Fee: "$1.47m",
  //   Revenue: "$146,251",
  //   Volume: "-",
  // },
];
const keys = ["DApp", "Tags", "TVL", "Fee", "Revenue", "Volume"];
const Ecosystem = () => {
  return (
    <Section heading="Ecosystem">
      <Stack>
        <Tabs
          border="1px solid rgba(255, 255, 255, 0.10)"
          variant="soft-rounded"
          colorScheme="green"
          width={"fit-content"}
          borderRadius={"10px"}
        >
          <TabList>
            <Tab bg={"transparent"}>24 Hours</Tab>
            <Tab bg={"transparent"}>7 Days</Tab>
            <Tab bg={"transparent"}>30 Days</Tab>
          </TabList>
        </Tabs>
        <CustomTable keys={keys} data={data} />
      </Stack>
    </Section>
  );
};

export default Ecosystem;
