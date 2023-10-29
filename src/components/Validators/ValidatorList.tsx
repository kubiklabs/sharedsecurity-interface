import React, { useEffect, useState } from "react";
import Section from "../Layout/Section";
import { useCosmosValidatorQuery } from "../../hooks/chains/cosmos/useCosmosValidatorQuery";
import CustomTable from "../DataDisplay/CustomTable";
import { Center, Grid, Select, Spinner } from "@chakra-ui/react";
import Overview from "./Overview";
import { useRecoilValue } from "recoil";
import { cosmosValidatorState } from "../../context/cosmosValidatorState";
import CustomSkeleton from "../skeleton/CustomSkeleton";

const ValidatorsList = () => {
  const { getParsedActiveValidators } = useCosmosValidatorQuery();
  const [activeValidators, setActiveValidators] = useState<any[]>([]);
  const { active, jailed, validators } = useRecoilValue(cosmosValidatorState);
  const [param, setParam] = useState("active");

  useEffect(() => {
    fetchValidators();
  }, []);

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

  return (
    <Section
      heading="Validators"
      sideText={`${activeValidators.length}/${validators?.length || "-"}`}
    >
      <Overview active="180" total="573" averageComm="11.03%" />

      <Select onChange={handleChange} size="lg" width={"fit-content"}>
        <option value="active">Active</option>
        <option value="jailed">Jailed</option>
        <option value="all">All</option>
      </Select>

      {activeValidators && activeValidators.length ? (
        <CustomTable
          keys={activeValidators && Object.keys(activeValidators[0])}
          data={activeValidators}
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
