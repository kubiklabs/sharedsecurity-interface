/* eslint-disable react-hooks/exhaustive-deps */

import { Box } from "@chakra-ui/react";
import VpSection from "@/components/Governance/VpSection";
import LpSection from "@/components/Governance/LpSection";
import InfoSection from "@/components/Governance/InfoSection";
import OpSection from "@/components/Governance/OpSection";
import { useCosmosGovQuery } from "@/hooks/chains/cosmos/useCosmosGovQuery";
import { useEffect, useRef, useState } from "react";
import { ILpCardProps } from "@/components/Governance/LpCard";
import { useNeutronGovQuery } from "@/hooks/chains/neutron/useNeutronGovQuery";
import { useStrideGovQuery } from "@/hooks/chains/stride/useStrideGovQuery";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { proposalsState } from "@/context/proposalsState";
import { compareProposals } from "@/utils/common";
import { userVpState } from "@/context/userVpState";
import BrowserTitle from "@/components/BrowserTitle/BrowserTitle";


const Governance = () => {
  const [loading, setLoading] = useState(false);
  const { getCosmosLpList, getCosmosOpList } = useCosmosGovQuery();
  const { getNeutronLpList, getNeutronOpList } = useNeutronGovQuery();
  const { getStrideLpList, getStrideOpList } = useStrideGovQuery();
  const neutronLpList = useRef<ILpCardProps[]>([]);
  const neutronOpList = useRef<ILpCardProps[]>([]);
  const strideLpList = useRef<ILpCardProps[]>([]);
  const strideOpList = useRef<ILpCardProps[]>([]);
  const { sortedLpList, sortedOpList, userVotingPower } =
    useRecoilValue(proposalsState);
  const setAllProposals = useSetRecoilState(proposalsState);
  const [userVp, setUserVp] = useRecoilState(userVpState);

  useEffect(() => {
    if (!sortedLpList?.length || !sortedOpList?.length) fetchAllProposalsList();
  }, []);


  const fetchAllProposalsList = async () => {
    setLoading(true);
    const lpList = await getCosmosLpList();
    neutronLpList.current = await getNeutronLpList();
    strideLpList.current = await getStrideLpList();
    const opList = await getCosmosOpList();
    neutronOpList.current = await getNeutronOpList();
    strideOpList.current = await getStrideOpList();

    console.log(userVp);

    setUserVp((prevUserVp) => ({
      ...prevUserVp,
      Cosmos: {
        ...prevUserVp.Cosmos,
        Lp: lpList.length,
        Op: opList.length,
      },
      Neutron: {
        ...prevUserVp.Neutron,
        Lp: neutronLpList.current.length,
        Op: neutronOpList.current.length,
      },
      Stride: {
        ...prevUserVp.Stride,
        Lp: strideLpList.current.length,
        Op: strideOpList.current.length,
      },
    }));


    const updatedState = {
      userVotingPower,
      sortedLpList: [
        ...neutronLpList.current,
        ...lpList,
        ...strideLpList.current,
      ].sort(compareProposals),
      sortedOpList: [
        ...neutronOpList.current,
        ...opList,
        ...strideOpList.current,
      ].sort(compareProposals),
    };
    setAllProposals(updatedState);
    setLoading(false);
  };

  return (
    <>
      <BrowserTitle title="Governance" />
      <Box>
        <Box
          flexDirection={"column"}
          position={"relative"}
          display={"flex"}
          gap={"50px"}
        >
          <VpSection />
          <LpSection isLoading={loading} lpList={sortedLpList} />
          <InfoSection />
          <OpSection isLoading={loading} opList={sortedOpList} />
        </Box>
      </Box>
    </>
  );
};

export default Governance;
