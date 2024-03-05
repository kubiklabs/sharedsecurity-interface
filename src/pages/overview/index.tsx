import { Box } from "@chakra-ui/react";
import Featured from "@/components/Overview/Featured";
import { useEffect } from "react";
import { useChainMarketInfo } from "@/hooks/useChainMarketInfo";
import Trends from "@/components/Overview/Trends";
import BrowserTitle from "@/components/BrowserTitle/BrowserTitle";

const stats = [
  {
    label: "Transaction Monitoring",
    number: "31,000,21",
  },
  {
    label: "Recent Transactions (last 24hr)",
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
    <>
    <BrowserTitle title="Overview" />
    <Box>
      <Box flexDirection={"column"} display={"flex"} gap={"70px"}>
        <Featured stats={stats} />
        <Trends />
      </Box>
    </Box>
    </>
  );
};

export default Overwiew;
