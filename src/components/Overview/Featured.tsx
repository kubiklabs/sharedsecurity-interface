import React, { useEffect, useState } from "react";
import Section from "../Layout/Section";
import {
  Grid,
  GridItem,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
} from "@chakra-ui/react";
import StatDisplay from "../DataDisplay/StatDisplay";
import { useRecoilState } from "recoil";
import { marketState } from "../../context/marketState";

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

const Featured = ({ stats }: { stats: Array<any> }) => {
  const [totalMarketCap, setTotalMarketCap] = useState("-");
  const [{ Cosmos, Neutron, Stride }, setMarketState] =
    useRecoilState(marketState);

  // useEffect(() => {
  //   calculateTotalMarketCap();
  // }, [Cosmos]);

  const calculateTotalMarketCap = () => {
    let totalMarketCap = 0;
    console.log(Cosmos);

    if (Cosmos) {
      console.log(Cosmos.market_cap);

      totalMarketCap =
        Number(Cosmos.market_cap) +
        Number(Neutron?.market_cap) +
        Number(Stride?.market_cap);
    }
    setTotalMarketCap(totalMarketCap.toLocaleString());
    return totalMarketCap.toLocaleString();
  };
  return (
    <Section heading="Featured">
      <Grid
        p={"15px"}
        gap={"20px"}
        // justifyContent={"space-evenly"}
        // gridAutoFlow={"column"}
        gridTemplateColumns={"repeat(auto-fit, minmax(100px, 300px))"}
      >
        <GridItem>
          <StatDisplay label={"Transactions Monitoring"} number={"3,100,012"} />
        </GridItem>
        <GridItem>
          <StatDisplay label={"Active Accounts"} number={"310,121"} />
        </GridItem>
        <GridItem>
          <StatDisplay
            label={"Total Market Cap"}
            number={`$ ${totalMarketCap}`}
          />
        </GridItem>
        <GridItem>
          <StatDisplay label={"Total Proposals"} number={"1,012"} />
        </GridItem>
      </Grid>
    </Section>
  );
};

export default Featured;
