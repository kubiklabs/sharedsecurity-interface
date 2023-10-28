import React, { useEffect } from "react";
import Section from "../Layout/Section";
import { Center, Spinner, Stack, Tab, TabList, Tabs } from "@chakra-ui/react";
import CustomTable from "../DataDisplay/CustomTable";
import { useAez } from "../../hooks/useAez";
import { useRecoilValue } from "recoil";
import {
  ecosystemState,
  astroportTvlState,
  marsTvlState,
  strideTvlState,
} from "../../context/ecosystemState";
import strideAdapter from "../../hooks/chains/stride/adapter/useStrideDefiAdapter";

const Ecosystem = () => {
  const { getParsedEcosystemData } = useAez();
  const { data } = useRecoilValue(ecosystemState);
  const astroportTvl = useRecoilValue(astroportTvlState);
  const strideTvl = useRecoilValue(strideTvlState);
  const marsTvl = useRecoilValue(marsTvlState);
  console.log(data);

  const {
    stride: { tvl },
  } = strideAdapter;

  useEffect(() => {
    if (!data || !data.length) getParsedData();
  }, []);

  const getParsedData = async () => {
    const data = await getParsedEcosystemData();
    console.log(data);
  };
  return (
    <Section heading="Ecosystem">
      <Stack>
        {/* <Tabs
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
        </Tabs> */}
        {data && data.length ? (
          <CustomTable
            keys={data && Object.keys(data[0])}
            data={data}
            minGridWidth="80px"
            maxGridWidth="100px"
            gridColumnGap="0px"
          />
        ) : (
          <Center>
            <Spinner />
          </Center>
        )}
      </Stack>
    </Section>
  );
};

export default Ecosystem;
