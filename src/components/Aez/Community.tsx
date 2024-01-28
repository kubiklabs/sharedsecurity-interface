import React from "react";
import Section from "../Layout/Section";
import CustomTable from "../DataDisplay/CustomTable";
import communityCalls from "../../config/communityCalls.json";
import { Flex } from "@chakra-ui/react";
// import { communityCalls } from "../../utils/constant";

const keys = ["Topic", "Tags", "Date", "Twitter Spaces"];
const data = [
  {
    Topic: "Neutron and Duality Merger",
    Tags: ["Atom Zone #13"],
    Date: "Aug 22, 2023",
    "Twitter Spaces": "Atom Zone #13",
  },
];
const avatarNeutron = "avatarNeutron";
const avatarAtom = "avatarAtom";

const modifyData = (data: any, avatar: any) => {
  const newData = data.map((item: any) => {
    return {
      ...item,
      type: avatar,
    };
  });
  return newData;
};

const Community = () => {
  return (
    <Flex gap="50px" mx={"auto"} flexWrap={"wrap"} flexGrow={1}>
      <Section
        width="540px"
       //width={"auto"}
        heading="Atom Zone Community Calls"
        subtitle="Stay up to date"
      >
        <CustomTable
          keys={Object.keys(communityCalls[0])}
          data={modifyData(communityCalls.reverse(), avatarNeutron)}
          minGridWidth="150px"
          pagination={true}
          itemsPerPage={5}
          color="#bfbfbfcc"
        />
      </Section>
      <Section
      width="540px"
      // width={"auto"}
        heading="Atom Zone Agora Calls"
        subtitle="A gathering place to address the topics shaping ATOM Ecosystem"
      >
        <CustomTable
          keys={Object.keys(communityCalls[0])}
          data={modifyData(communityCalls, avatarAtom)}
          minGridWidth="150px"
          pagination={true}
          color="#bfbfbfcc"
          itemsPerPage={5}
        />
      </Section>
    </Flex>
  );
};

export default Community;
