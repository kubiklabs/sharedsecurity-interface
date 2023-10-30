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
import { useRecoilValue } from "recoil";
import { cosmosValidatorState } from "../../context/cosmosValidatorState";
import CustomSkeleton from "../skeleton/CustomSkeleton";

const ValidatorsList = () => {
  const { getParsedActiveValidators } = useCosmosValidatorQuery();
  const [activeValidators, setActiveValidators] = useState<any[]>([]);
  const { active, jailed, validators } = useRecoilValue(cosmosValidatorState);
  const [param, setParam] = useState("active");
  const [softOpt, setSoftOpt] = useState(false);
  const [softOptIndex, setSoftOptIndex] = useState(-1);

  useEffect(() => {
    if (!validators.length) fetchValidators();
    getSoftOptOutIndex();
  }, [active]);

  const getAvgCommission = () => {};

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

  const fetchValidators = async () => {
    let list = active;
    if (!list.length) list = await getParsedActiveValidators();
    setActiveValidators(list);
    // console.log(list);
  };

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

  return (
    <Section
      heading="Validators"
      sideText={`${activeValidators.length}/${validators?.length || "-"}`}
    >
      <Overview active="180" total="573" averageComm="11.03%" />
      <Flex alignItems={"center"} gap={"50px"}>
        <Select
          isDisabled={softOpt}
          onChange={handleChange}
          size="lg"
          minW={"100px"}
          width={"fit-content"}
        >
          <option value="active">Active</option>
          <option value="jailed">Jailed</option>
          <option value="all">All</option>
        </Select>
        {softOptIndex > 0 && (
          <FormControl>
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
      </Flex>

      {activeValidators && activeValidators.length ? (
        <CustomTable
          keys={activeValidators && Object.keys(activeValidators[0])}
          data={
            softOpt
              ? active.slice(softOptIndex, active.length)
              : activeValidators
          }
          minGridWidth="80px"
          maxGridWidth="100px"
          gridColumnGap="0px"
          pagination={true}
          itemsPerPage={20}
        />
      ) : (
        <>
          <Center>
            <Spinner />
          </Center>
          <CustomSkeleton count={10} height="50px" />
        </>
      )}
    </Section>
  );
};

export default ValidatorsList;
