/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";
import Section from "@/components/Layout/Section";
import { useCosmosValidatorQuery } from "@/hooks/chains/cosmos/useCosmosValidatorQuery";
import CustomTable from "@/components/DataDisplay/CustomTable";
import {
  Flex,
  FormControl,
  Select,
  Switch,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import Overview from "@/components/Validators/Overview";
import { useRecoilValue } from "recoil";
import { cosmosValidatorState } from "@/context/cosmosValidatorState";
import CustomSkeleton from "@/components/skeleton/CustomSkeleton";
import { calculateAverageCommissionRate } from "@/utils/common";

const ValidatorsList = () => {
  const { getParsedActiveValidators } = useCosmosValidatorQuery();
  const [visibleValidators, setVisibleValidators] = useState<any[]>([]);
  const { active, jailed, validators, mCoefficient, nCoefficient } =
    useRecoilValue(cosmosValidatorState);
  const [softOpt, setSoftOpt] = useState(false);
  const [softOptIndex, setSoftOptIndex] = useState(-1);

  const fetchValidators = async () => {
    let list = active;
    if (!list.length) list = await getParsedActiveValidators();
    setVisibleValidators(list);
  };

  useEffect(() => {
    // Fetch data only if dataList is empty (first load)
    if (!visibleValidators.length) fetchValidators();
    getSoftOptOutIndex();
  }, [active]);

  const getSoftOptOutIndex = () => {
    let power = 0;

    for (const i in active) {
      power += parseFloat(active[i]["Share %"].replace(/%/g, ""));
      if (power >= 95) {

        setSoftOptIndex(Number(i));
        return i;
      }
    }
  };

  const handleChange = (e: any) => {
    const option = e.target.value;
    if (option === "active") setVisibleValidators(active);
    else if (option === "jailed") setVisibleValidators(jailed);
    else setVisibleValidators(validators);
  };

  const handleSoftOptToggle = (e: any) => {
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
    calculateAverageCommissionRate(visibleValidators).toFixed(2) + "%";

  return (
    <>
      <Overview
        active={`${active?.length}`}
        total={`${validators?.length}`}
        averageComm={`${averageCommission}`}
        nCoefficient={nCoefficient}
        mCoefficient={mCoefficient}
      />

      <Section
        heading="Validators"
        sideText={`${visibleValidators.length}/${validators?.length || "-"}`}
        subtitle={` ${validators?.length} Allocated`}
      >
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

        {visibleValidators && visibleValidators.length ? (
          <CustomTable
            keys={visibleValidators && Object.keys(visibleValidators[0])}
            data={modifyData(
              softOpt
                ? active.slice(softOptIndex, active.length)
                : visibleValidators,
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
            <CustomSkeleton count={5} height="50px" />
          </>
        )}
      </Section>
    </>
  );
};

export default ValidatorsList;
