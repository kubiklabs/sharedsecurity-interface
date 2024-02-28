import React from "react";
import Section from "../Layout/Section";
import CustomTable from "../DataDisplay/CustomTable";
import communityCalls from "../../config/communityCalls.json";
import agoraCalls from "../../config/agoraCalls.json";
import { SimpleGrid } from "@chakra-ui/react";
// import { communityCalls } from "../../utils/constant";

const Community = () => {
  return (
    //<Flex gap="50px"  flexWrap={"wrap"} >
    <SimpleGrid
      spacing={"50px"}
      columns={{ md: 1, lg: 2 }}
      minChildWidth={"540px"}
    >
      <Section
        //width="540px"
        //width={"auto"}
        heading="Atom Zone Community Calls"
        subtitle="Stay up to date"
        padding="30px 40px"
      >
        <CustomTable
          keys={Object.keys(communityCalls[0])}
          data={communityCalls.reverse()}
          minGridWidth="150px"
          pagination={true}
          itemsPerPage={5}
          color="#bfbfbfcc"
          overflow="clip"
        />
      </Section>
      <Section
        //width="540px"
        // width={"auto"}
        heading="Atom Zone Agora Calls"
        subtitle="A gathering place to address the topics shaping ATOM Ecosystem"
        padding="30px 40px"
      >
        <CustomTable
          keys={Object.keys(agoraCalls[0])}
          data={agoraCalls}
          minGridWidth="150px"
          pagination={true}
          color="#bfbfbfcc"
          itemsPerPage={5}
          overflow="clip"
        />
      </Section>
    </SimpleGrid>
  );
};

export default Community;
