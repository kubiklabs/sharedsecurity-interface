import React from "react";
import ConnectWalletButton from "../Buttons/ConnectWalletButton";
import { Box, Divider, Flex, Image, Input, Text } from "@chakra-ui/react";
import kubikLogo from "../../assets/kubik-logo.png";
// import { NavLink } from "react-router-dom";
import NavItem from "./NavItem";

const SideBar = () => {
  return (
    <Box pr={"20px"} borderRight={"1px solid white"} minWidth={"200px"}>
      <Flex>
        <Image width={"60px"} src={kubikLogo} alt="logo" />
        <Text>Shared Security</Text>
      </Flex>
      <Divider height={"1px"} bg={"white"} />
      <Input
        placeholder="Search"
        size="lg"
        height={"30px"}
        borderRadius={"5px"}
        border={"none"}
        px={"5px"}
        width={"100%"}
      />
      <Box>
        <NavItem path="" name="Overview" iconName="overview" />
        <NavItem path="aez" name="Atomic Economic Zone" iconName="swap_horiz" />
        <NavItem path="gov" name="Governance" iconName="person" />
        <NavItem path="assets" name="Asset" iconName="toll" />
        <NavItem
          path="validators"
          name="Validator"
          iconName="supervisor_account"
        />
      </Box>
    </Box>
  );
};

export default SideBar;
