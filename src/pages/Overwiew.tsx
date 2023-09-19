import { Box } from "@chakra-ui/react";
import Featured from "../components/Overview/Featured";
import { useEffect } from "react";
import { useChainMarketInfo } from "../hooks/useChainMarketInfo";
import Trends from "../components/Overview/Trends";

const stats = [
  {
    label: "Transaction Monitoring",
    number: "31,000,21",
  },
  {
    label: "Active Accounts",
    number: "310,121",
  },
  {
    label: "Total Market Cap",
    number: "3,076,723,101",
  },
  {
    label: "Total Proposals",
    number: "1,002",
  },
];

const Overwiew = () => {
  const { getAllCoinsMarket } = useChainMarketInfo();
  useEffect(() => {
    getAllCoinsMarket();
  });
  return (
    <Box>
      <Box flexDirection={"column"} display={"flex"} gap={"20px"}>
        <Featured stats={stats} />
        <Trends />
      </Box>
    </Box>
  );
};

export default Overwiew;
