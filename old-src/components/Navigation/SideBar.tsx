import { Box, Divider, Flex, Image, Input, Text, Slide, Button } from "@chakra-ui/react";
import kubikLogo from "../../assets/kubik-logo-white.svg";
// import { NavLink } from "react-router-dom";
import NavItem from "./NavItem";
import ConnectWalletButton from "../Buttons/ConnectWalletButton";
import { Resizable } from 're-resizable';
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";


const SideBar = () => {

  // const [isOpen, setIsOpen] = useState(true)

  return (
    <>

      <Flex position={"fixed"} width={"100%"} zIndex={60} flexDir={"row"} borderBottom={"1px"} borderBottomColor={"#37343D"} paddingX={"30px"} paddingY={"20px"} bgColor={"#120E19"} justifyContent={"space-between"} alignItems={"center"}>
        <Flex flexDir={"row"} alignItems={"center"} gap={"10px"}>
          <Image width={"45px"} src={kubikLogo} alt="logo" />
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

      {/* <Button variant={"ghost"} border={"none"} _hover={{ bgColor: "#bc3d70", color:"white" }} color={"gray"} position={"absolute"} top={"41px"} left={"8px"} zIndex={999} padding={2} marginTop="0px" onClick={() => {
        setIsOpen(!isOpen);
      }}>
        <FontAwesomeIcon icon={faBars} fontSize={"1.4rem"} />
      </Button> */}
      {/* <Resizable
        minWidth={isOpen ? "300px" : "0px"}
        size={{ width: isOpen ? "" : "0px", height: "100%" }}
        minHeight={'100vh'}
        maxWidth={"50%"}
      > */}
      {/* <Box
          position={"relative"}
          display={isOpen ? "flex" : "none"}
          flexDirection={"column"}
          borderRight={"1px solid white"}
          justifyContent={"space-between"}
          py={"20px"}
          px={"20px"}
          // width={"300px"}
          overflow={"hidden"}
          height={"100vh"}
          backgroundColor={"black"}
          zIndex={10}
        >

          <Box minWidth={"200px"} marginTop={"10px"}>
            <Flex gap={"10px"} alignItems={"center"}>
              <Image width={"60px"} src={kubikLogo} alt="logo" />
              <Text fontSize={"2xl"} noOfLines={1} textAlign={"left"}>Shared Security</Text>
            </Flex>
            <Divider height={"1px"} bg={"white"} />
            <ConnectWalletButton />
      <Divider height={"1px"} bg={"white"} />

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
        </Box> */}
      {/* </Resizable> */}

    </>
  );
};

export default SideBar;
