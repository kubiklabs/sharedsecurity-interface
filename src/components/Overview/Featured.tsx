import React, { useEffect, useState } from "react";
import Section from "../Layout/Section";
import {
  Grid,
  GridItem,
} from "@chakra-ui/react";
import StatDisplay from "../DataDisplay/StatDisplay";
import { useRecoilState } from "recoil";
import { marketState } from "../../context/marketState";



const Featured = ({ stats }: { stats: Array<any> }) => {
  const [totalMarketCap, setTotalMarketCap] = useState("-");
  const [{ Cosmos, Neutron, Stride }, setMarketState] =
    useRecoilState(marketState);


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
  useEffect(() => {
    calculateTotalMarketCap()
  }, []);
  return (
    <Section heading="Featured">
      <Grid
        p={"15px"}
        gap={"20px"}
        gridTemplateColumns={"repeat(auto-fit, minmax(100px, 300px))"}
      >

        {stats.map((item)=>(
          <GridItem key={item.label}>
          <StatDisplay label={item.label} number={item.label==="Total Market Cap"?`$ ${totalMarketCap}`:item.number} bg="transparent"/>
        </GridItem>
        ))}
      </Grid>
    </Section>
  );
};

export default Featured;
