import React from "react";
import Section from "../Layout/Section";
import CustomTable from "../DataDisplay/CustomTable";
import { communityCalls } from "../../utils/constant";

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
      <CustomTable
        keys={Object.keys(communityCalls[0])}
        data={communityCalls}
        minGridWidth="150px"
        pagination={true}
      />
    </Section>
  );
};

export default Community;
