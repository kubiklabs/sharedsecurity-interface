import { Box } from "@chakra-ui/react";

import Ecosystem from "@/components/Aez/Ecosystem";
import CCStatus1 from "@/components/Aez/CCStatus1";
import Community from "@/components/Aez/Community";

const Aez = () => {
    return (
        <Box flexDirection={"column"} display={"flex"} gap={"60px"}>
            <Ecosystem />
            <CCStatus1 />
            <Community />
        </Box>
    );
};

export default Aez;
