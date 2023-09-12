import { Box } from "@chakra-ui/react";
import { IVpCardProps } from "../components/Governance/VpCard";
import VpSection from "../components/Governance/VpSection";
import LpSection from "../components/Governance/LpSection";
import { vpList } from "../utils/constant";
import InfoSection from "../components/Governance/InfoSection";
import OpSection from "../components/Governance/OpSection";
import { useCosmosGovQuery } from "../hooks/chains/cosmos/useCosmosGovQuery";
import { useEffect, useState } from "react";
import { ILpCardProps } from "../components/Governance/LpCard";
import { useNeutronQuery } from "../hooks/chains/neutron/useNeutronQuery";

const Governance = () => {
  const [lpList, setLpList] = useState<Array<ILpCardProps>>([]);
  const [opList, setOpList] = useState<Array<ILpCardProps>>([]);

  const { getLpList, getOpList } = useCosmosGovQuery();
  const { getNeutronProposals } = useNeutronQuery();
  useEffect(() => {
    const dummy = async () => {
      const lpList = await getLpList();
      const opList = await getOpList();
      const neutronList = await getNeutronProposals();
      console.log(lpList);
      setLpList(lpList);
      setOpList(opList);
    };
    dummy();
  }, []);

  return (
    <Box>
      <Box flexDirection={"column"} display={"flex"} gap={"20px"}>
        <VpSection vpList={vpList} />
        <LpSection lpList={lpList} />
        <InfoSection />
        <OpSection lpList={opList} />
      </Box>
    </Box>
  );
};

export default Governance;
