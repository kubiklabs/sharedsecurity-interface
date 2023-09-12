import { Box } from "@chakra-ui/react";
import { IVpCardProps } from "../components/Governance/VpCard";
import VpSection from "../components/Governance/VpSection";
import LpSection from "../components/Governance/LpSection";
import { vpList } from "../utils/constant";
import InfoSection from "../components/Governance/InfoSection";
import OpSection from "../components/Governance/OpSection";
import { useCosmosGovQuery } from "../hooks/chains/cosmos/useCosmosGovQuery";
import { useEffect, useRef, useState } from "react";
import { ILpCardProps } from "../components/Governance/LpCard";
import { useNeutronQuery } from "../hooks/chains/neutron/useNeutronQuery";

const Governance = () => {
  const [lpList, setLpList] = useState<Array<ILpCardProps>>([]);
  const [opList, setOpList] = useState<Array<ILpCardProps>>([]);

  const { getLpList, getOpList } = useCosmosGovQuery();
  const { getNeutronLpList, getNeutronOpList } = useNeutronQuery();
  const neutronLpList = useRef<ILpCardProps[]>([]);
  const neutronOpList = useRef<ILpCardProps[]>([]);

  useEffect(() => {
    const dummy = async () => {
      const lpList = await getLpList();
      const opList = await getOpList();
      neutronLpList.current = await getNeutronLpList();
      neutronOpList.current = await getNeutronOpList();
      console.log(neutronLpList, neutronOpList);
      setLpList(lpList);
      setOpList(opList);
    };
    dummy();
  }, []);

  return (
    <Box>
      <Box flexDirection={"column"} display={"flex"} gap={"20px"}>
        <VpSection vpList={vpList} />
        <LpSection lpList={[...neutronLpList.current, ...lpList]} />
        <InfoSection />
        <OpSection lpList={[...neutronOpList.current, ...opList]} />
      </Box>
    </Box>
  );
};

export default Governance;
