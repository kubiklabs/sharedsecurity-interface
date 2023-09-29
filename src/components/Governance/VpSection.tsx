import Section from "../Layout/Section";
import { Center, Grid, GridItem, Link, Skeleton, Text } from "@chakra-ui/react";
import VpCard from "./VpCard";
import { useRecoilValue } from "recoil";
import { walletState } from "../../context/walletState";
import { useConnectWallet } from "../../hooks/useConnectWallet";
import { useState } from "react";

const VpSection = () => {
  const { isLoggedIn } = useRecoilValue(walletState);
  const [isLoading, setIsLoading] = useState(false);
  const connectWallet = useConnectWallet();
  const handleWalletConnect = async () => {
    setIsLoading(true);
    await connectWallet();
    setIsLoading(false);
  };
  return (
    <Section
      heading="My Voting Power"
      subtitle="Get to know the value of your vote."
    >
      {!isLoggedIn ? (
        <Center
          p={"25px"}
          bg={"rgba(255, 255, 255, 0.10)"}
          borderRadius={"10px"}
        >
          <Text>
            <Link onClick={handleWalletConnect} color={"blue.500"}>
              Connect Wallet
            </Link>{" "}
            to see voting power.
          </Text>
        </Center>
      ) : (
        <Grid
          p={"15px"}
          gap={"20px"}
          gridTemplateColumns={"repeat(auto-fit, minmax(320px, 1fr))"}
        >
          <GridItem>
            <VpCard name="Cosmos" />
          </GridItem>
          <GridItem>
            <VpCard name="Neutron" />
          </GridItem>
          <GridItem>
            <VpCard name="Stride" />
          </GridItem>
        </Grid>
      )}
    </Section>
  );
};

export default VpSection;
