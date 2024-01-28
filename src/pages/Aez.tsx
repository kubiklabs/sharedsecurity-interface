import { Box } from "@chakra-ui/react";

import Ecosystem from "../components/Aez/Ecosystem";
import Community from "../components/Aez/Community";
import CCStatus1 from "../components/Aez/CCStatus1";

const Aez = () => {
  return (
    <Box>
      <Box flexDirection={"column"} display={"flex"} gap={"60px"}>
        {/* <Featured /> */}
        <Ecosystem />
        <CCStatus1 />
        <Community />
       
        {/* <CCStatus2 /> */}
      </Box>
    </Box>
  );
};

export default Aez;
