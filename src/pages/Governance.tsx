import { Box } from "@chakra-ui/react";
import { IVpCardProps } from "../components/Governance/VpCard";
import VpSection from "../components/Governance/VpSection";
import LpSection from "../components/Governance/LpSection";
import { lpList, vpList } from "../utils/constant";

const Governance = () => {
  return (
    <Box>
      <Box flexDirection={"column"} display={"flex"} gap={"20px"}>
        <VpSection vpList={vpList} />
        <LpSection lpList={lpList} />
      </Box>
    </Box>
  );
};

export default Governance;
