import { Box, Divider, Flex, Image, Input, Text } from "@chakra-ui/react";
import kubikLogo from "../../assets/kubik-logo-white.png";
// import { NavLink } from "react-router-dom";
import NavItem from "./NavItem";
import ConnectWalletButton from "../Buttons/ConnectWalletButton";

const SideBar = () => {
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      borderRight={"1px solid white"}
      justifyContent={"space-between"}
      py={"20px"}
      pr={"20px"}
      width={"300px"}
    >
      <Box minWidth={"200px"}>
        <Flex gap={"10px"} alignItems={"center"}>
          <Image width={"60px"} src={kubikLogo} alt="logo" />
          <Text fontSize={"2xl"}>Shared Security</Text>
        </Flex>
        <Divider height={"1px"} bg={"white"} />
        {/* <ConnectWalletButton />
      <Divider height={"1px"} bg={"white"} /> */}

        <Box mt={"30px"} display={"flex"} flexDir={"column"} gap={"10px"}>
          <NavItem path="overview" name="Overview" iconName="overview" />
          <NavItem
            path="aez"
            name="Atomic Economic Zone"
            iconName="swap_horiz"
          />
          <NavItem path="gov" name="Governance" iconName="person" />
          <NavItem path="assets" name="Asset" iconName="toll" />
          <NavItem
            path="validators"
            name="Validator"
            iconName="supervisor_account"
          />
        </Box>
      </Box>
      <ConnectWalletButton />
    </Box>
  );
};

export default SideBar;
