import Section from "../Layout/Section";
import {
  Center,
  Grid,
  GridItem,
  Link,
  Skeleton,
  Spinner,
  Text,
  Box
} from "@chakra-ui/react";
import VpCard from "./VpCard";
import { useRecoilValue } from "recoil";
import { walletState } from "../../context/walletState";
import { useConnectWallet } from "../../hooks/useConnectWallet";
import { useEffect, useState } from "react";
import { useGovernance } from "../../hooks/useGovernance";
import { userVpState } from "../../context/userVpState";
import CustomTable from "../DataDisplay/CustomTable";
import VpTable from "./VpTable";

const VpSection = () => {
  const { isLoggedIn } = useRecoilValue(walletState);
  const { fetchAllUserVp } = useGovernance();
  const { Cosmos } = useRecoilValue(userVpState);

  const [isLoading, setIsLoading] = useState(false);
  const connectWallet = useConnectWallet();

  useEffect(() => {
    if (!isLoggedIn) return;
    setIsLoading(true);
    handleFetchAllUserVp();
    setIsLoading(false);
  }, [isLoggedIn]);

  const handleFetchAllUserVp = async () => {
    setIsLoading(true);
    await fetchAllUserVp();
    setIsLoading(false);
  };

  const handleWalletConnect = async () => {
    setIsLoading(true);
    await connectWallet();
    setIsLoading(false);
  };
  return (
    // <Box py={"40px"} px={"60px"} bgColor={"#17131E"} borderRadius={"15px"}>
      <Section
        heading="Your Voting Power"
        subtitle="Get to know the value of your vote."
      >
        {!isLoggedIn ? (
          <Center
            p={"25px"}
            bg={"rgba(255, 255, 255, 0.10)"}
            borderRadius={"10px"}
            marginX={"15px"}
          >
            {!isLoading ? (
              <Text>
                <Link onClick={handleWalletConnect} color={"blue.500"}>
                  Connect Wallet
                </Link>{" "}
                to see voting power.
              </Text>
            ) : (
              <Spinner width={"3rem"} height="3rem" />
            )}
          </Center>
        ) : (
          <Box>
            <VpTable/>
            {/* <Grid
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
          </Grid> */}

          </Box>
        )}



      </Section>
    // </Box>
  );
};

export default VpSection;
