import { Box } from "@chakra-ui/react";
import React from "react";
import Featured from "../components/Aez/Featured";
import Ecosystem from "../components/Aez/Ecosystem";
import Community from "../components/Aez/Community";
import CCStatus1 from "../components/Aez/CCStatus1";
import CCStatus2 from "../components/Aez/CCStatus2";

const Aez = () => {
  return (
    <Box>
      <Box flexDirection={"column"} display={"flex"} gap={"20px"}>
        <Featured />
        <Ecosystem />
        <Community />
        <CCStatus1 />
        {/* <CCStatus2 /> */}
      </Box>
    </Box>
  );
};

export default Aez;
