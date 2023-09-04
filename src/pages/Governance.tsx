import { Box } from "@chakra-ui/react";
import { IVpCardProps } from "../components/Governance/VpCard";
import VpSection from "../components/Governance/VpSection";
import LpSection from "../components/Governance/LpSection";

const vpList: Array<IVpCardProps> = [
  {
    accountAddress: "neutron1...x0v",
    amountStaked: "1,234,234",
    denom: "NTRN",
    totalParticipated: "55",
    totalValidators: "90",
    votePercent: "50%",
  },
  {
    accountAddress: "neutron1...x0v",
    amountStaked: "1,234,234",
    denom: "ATOM",
    totalParticipated: "55",
    totalValidators: "90",
    votePercent: "50%",
  },
  {
    accountAddress: "neutron1...x0v",
    amountStaked: "1,234,234",
    denom: "ATOM",
    totalParticipated: "55",
    totalValidators: "90",
    votePercent: "50%",
  },
  {
    accountAddress: "neutron1...x0v",
    amountStaked: "1,234,234",
    denom: "NTRN",
    totalParticipated: "55",
    totalValidators: "90",
    votePercent: "50%",
  },
  {
    accountAddress: "neutron1...x0v",
    amountStaked: "1,234,234",
    denom: "ATOM",
    totalParticipated: "55",
    totalValidators: "90",
    votePercent: "50%",
  },
  {
    accountAddress: "neutron1...x0v",
    amountStaked: "1,234,234",
    denom: "ATOM",
    totalParticipated: "55",
    totalValidators: "90",
    votePercent: "50%",
  },
];

const Governance = () => {
  return (
    <Box>
      <Box flexDirection={"column"} display={"flex"} gap={"20px"}>
        <VpSection vpList={vpList} />
        <LpSection />
      </Box>
    </Box>
  );
};

export default Governance;
