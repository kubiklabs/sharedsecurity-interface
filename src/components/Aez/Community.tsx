import React from "react";
import Section from "../Layout/Section";
import CustomTable from "../DataDisplay/CustomTable";

const keys = ["Topic", "Tags", "Date", "Twitter Spaces"];
const data = [
  {
    Topic: "Neutron and Duality Merger",
    Tags: ["Atom Zone #13"],
    Date: "Aug 22, 2023",
    "Twitter Spaces": "Atom Zone #13",
  },
  // {
  //   Topic: "Neutron and Duality Merger",
  //   Tags: ["Atom Zone #13"],
  //   Date: "Aug 22, 2023",
  //   "Twitter Spaces": "Atom Zone #13",
  // },
  // {
  //   Topic: "Neutron and Duality Merger",
  //   Tags: ["Atom Zone #13"],
  //   Date: "Aug 22, 2023",
  //   "Twitter Spaces": "Atom Zone #13",
  // },
];

const Community = () => {
  return (
    <Section heading="Community Calls">
      <CustomTable keys={keys} data={data} />
    </Section>
  );
};

export default Community;
