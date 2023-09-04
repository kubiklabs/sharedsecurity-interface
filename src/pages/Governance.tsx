import { Box } from "@chakra-ui/react";
import { IVpCardProps } from "../components/Governance/VpCard";
import VpSection from "../components/Governance/VpSection";
import LpSection from "../components/Governance/LpSection";
import { lpList, vpList } from "../utils/constant";
import InfoSection from "../components/Governance/InfoSection";
import OpSection from "../components/Governance/OpSection";

const Governance = () => {
  return (
    <Box>
      <Box flexDirection={"column"} display={"flex"} gap={"20px"}>
        <VpSection vpList={vpList} />
        <LpSection lpList={lpList} />
        <InfoSection />
        <OpSection lpList={lpList} />
      </Box>
    </Box>
  );
};

export default Governance;
