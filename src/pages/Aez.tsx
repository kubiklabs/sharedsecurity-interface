import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import Featured from "../components/Aez/Featured";
import Ecosystem from "../components/Aez/Ecosystem";
import Community from "../components/Aez/Community";
import CCStatus1 from "../components/Aez/CCStatus1";
import { useNtrnAstroQuery } from "../hooks/chains/neutron/astroport/useNtrnAstroQuery";

const Aez = () => {
  const { getTvlAllPools } = useNtrnAstroQuery();

  // useEffect(() => {
  //   fetchPool();
  // }, []);

  // const fetchPool = async () => {
  //   const pools = await getTvlAllPools();
  //   console.log(pools);
  // };
  return (
    <Box>
      <Box flexDirection={"column"} display={"flex"} gap={"20px"}>
        {/* <Featured /> */}
        <Ecosystem />
        <Community />
        <CCStatus1 />
        {/* <CCStatus2 /> */}
      </Box>
    </Box>
  );
};

export default Aez;
