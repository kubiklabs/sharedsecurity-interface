import React from "react";
import Section from "../Layout/Section";
import CustomTable from "../DataDisplay/CustomTable";
import { consumerChainData } from "../../config/consumerChain.json";

const keys = ["Chains", "Status", "Forum Data", "Cosmos Forum", "Proposal"];
const data = [
  {
    Chains: "Neutron",
    Status: ["Proposal Passed", "Launched on Shared Security", "Gov-confirmed"],
    "Forum Data": "Mar 21, 2023",
    "Cosmos Forum": "Draft Pop",
    Proposal: "Prop792",
  },
];

const CCStatus1 = () => {
  return (
    <Section heading="Consumer Chains: Proposals and Status">
      <CustomTable
        data={consumerChainData}
        keys={Object.keys(consumerChainData[0])}
        minGridWidth="200px"
        maxGridWidth="250px"
      />
    </Section>
  );
};

export default CCStatus1;
