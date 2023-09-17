import React from "react";
import Section from "../Layout/Section";
import CustomTable from "../DataDisplay/CustomTable";

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
      <CustomTable data={data} keys={keys} />
    </Section>
  );
};

export default CCStatus1;
