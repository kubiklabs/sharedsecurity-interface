import { Box, Flex, Image, Text } from "@chakra-ui/react";
import NavItem from "./NavItem";
import ConnectWalletButton from "@/components/Buttons/ConnectWalletButton";


const SideBar = () => {
  return (
    <>
      <Flex position={"fixed"} width={"100%"} zIndex={60} flexDir={"row"} borderBottom={"1px"} borderBottomColor={"#37343D"} paddingX={"30px"} paddingY={"20px"} bgColor={"#120E19"} justifyContent={"space-between"} alignItems={"center"}>
        <Flex flexDir={"row"} alignItems={"center"} gap={"10px"}>
          <Image width={"45px"} src={'/images/kubik-logo-white.svg'} alt="logo" />
          <Text fontSize={"1.2rem"} noOfLines={1} color={"#F2F2F2"} textAlign={"left"}>Shared Security Info</Text>
        </Flex>
        <Flex flexDir={"row"} gap={"40px"} alignItems={"center"}>
          <NavItem path="overview" name="Home" />
          <NavItem path="aez" name="A.E.Z" />
          <NavItem path="gov" name="Governance" />
          <NavItem path="assets" name="Assets" />
          <NavItem path="validators" name="Validators" />
          <Box marginLeft={"40px"}>
            <ConnectWalletButton />
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

export default SideBar;
