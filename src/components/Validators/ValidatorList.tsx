import React, { useEffect, useState } from "react";
import Section from "../Layout/Section";
import { useCosmosValidatorQuery } from "../../hooks/chains/cosmos/useCosmosValidatorQuery";
import CustomTable from "../DataDisplay/CustomTable";
import {
  Center,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Select,
  Spinner,
  Switch,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import Overview from "./Overview";
import { useRecoilState, useRecoilValue } from "recoil";
import { cosmosValidatorState } from "../../context/cosmosValidatorState";
import CustomSkeleton from "../skeleton/CustomSkeleton";
import { calculateAverageCommissionRate } from "../../utils/common";

const ValidatorsList = () => {
  const { getParsedActiveValidators } = useCosmosValidatorQuery();
  const [activeValidators, setActiveValidators] = useState<any[]>([]);
  const { active, jailed, validators } = useRecoilValue(cosmosValidatorState);
  const [param, setParam] = useState("active");
  const [softOpt, setSoftOpt] = useState(false);
  const [softOptIndex, setSoftOptIndex] = useState(-1);
 // console.log(active,jailed,validators,"hiihih");

  const fetchValidators = async () => {
    let list = active;
  if (!list.length) list = await getParsedActiveValidators();
     console.log(list);
  setActiveValidators(list);

};

  useEffect(() => {
     // Fetch data only if dataList is empty (first load)
    if (!activeValidators.length) fetchValidators();
    getSoftOptOutIndex();
  }, [active]);

  const getSoftOptOutIndex = () => {
    let power = 0;

    for (const i in active) {
      power += parseFloat(active[i]["Share %"].replace(/%/g, ""));
      // console.log(power);
      if (power >= 95) {
        // console.log(i);

        setSoftOptIndex(Number(i));
        return i;
      }
    }
  };

  
  console.log(activeValidators);

  const handleChange = (e: any) => {
    const option = e.target.value;
    if (option === "active") setActiveValidators(active);
    else if (option === "jailed") setActiveValidators(jailed);
    else setActiveValidators(validators);
  };

  const handleSoftOptToggle = (e: any) => {
    console.log(e.target.value);
    setSoftOpt((prev) => !prev);
  };

  const upTime = "100%";

  const modifyData = (data: any, upTime: any) => {
    const newData = data.map((item: any) => {
      return {
        ...item,
        types: upTime,
      };
    });
    return newData;
  };

  const averageCommission =
    calculateAverageCommissionRate(activeValidators).toFixed(2) + "%";

  return (
    <>
      <Overview
        active={`${activeValidators?.length}`}
        total={`${validators?.length}`}
        averageComm={`${averageCommission}`}
      />
      <Section
        heading="Validators"
        sideText={`${activeValidators.length}/${validators?.length || "-"}`}
        subtitle={` ${validators?.length} Allocated`}
      >
        {/* <Overview active="180" total="573" averageComm="11.03%" /> */}
        <Flex
          alignItems={"center"}
          gap={"50px"}
          justifyContent={"flex-end"}
          marginTop={"-50px"}
        >
          {softOptIndex > 0 && (
            <FormControl width={"fit-content"}>
              <Flex gap={"15px"}>
                <Switch
                  onChange={handleSoftOptToggle}
                  colorScheme={"pink"}
                  id="soft-opt-out"
                  size="lg"
                />
                <Flex alignItems={"center"} gap={"10px"}>
                  <Text>Soft opt-out</Text>
                  <Tooltip label="In order to make the economics of ICS more favorable for Cosmos Hub validators, validators in the bottom 5% of vote power in the Cosmos Hub validator set would be given the option to opt-out from validating for the Stride/Neutron blockchain. This translates to roughly the bottom sixty-five validators.">
                    <Text
                      transform={"scale(0.8) translateY(5px)"}
                      height={"fit-content"}
                      cursor={"pointer"}
                    >
                      <span className="material-symbols-outlined">info</span>
                    </Text>
                  </Tooltip>
                </Flex>
              </Flex>
            </FormControl>
          )}
          <Select
            isDisabled={softOpt}
            onChange={handleChange}
            size="lg"
            minW={"100px"}
            width={"137px"}
            height={"36px"}
            fontSize={"14px"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            textAlign={"center"}
          >
            <option value="active">ACTIVE</option>
            <option value="jailed">JAILED</option>
            <option value="all">ALL</option>
          </Select>
        </Flex>

        {activeValidators && activeValidators.length ? (
          <CustomTable
            keys={activeValidators && Object.keys(activeValidators[0])}
            data={modifyData(
              softOpt
                ? active.slice(softOptIndex, active.length)
                : activeValidators,
              upTime
            )}
            minGridWidth="80px"
            maxGridWidth="100px"
            gridColumnGap="0px"
            pagination={true}
            itemsPerPage={50}
          />
        ) : (
          <>
            <Center>
              <Spinner />
            </Center>
            <CustomSkeleton count={5} height="50px" />
          </>
        )}
      </Section>
    </>
  );
};

export default ValidatorsList;
