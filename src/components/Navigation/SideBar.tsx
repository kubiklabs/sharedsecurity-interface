import { Box, Divider, Flex, Image, Input, Text, Slide, Button } from "@chakra-ui/react";
import kubikLogo from "../../assets/kubik-logo-white.png";
// import { NavLink } from "react-router-dom";
import NavItem from "./NavItem";
import ConnectWalletButton from "../Buttons/ConnectWalletButton";
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const SideBar = () => {

  const [isOpen, setIsOpen] = useState(false)
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        sidebarRef.current
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [sidebarRef]);

  return (
    <>
      <Button colorScheme='gray' variant="outline" padding={2} marginY="25px" onClick={(e) => {
        e.stopPropagation(); // Stop the event propagation
        setIsOpen(!isOpen);
      }}>
        <FontAwesomeIcon icon={faBars} color="gray" />
      </Button>
      <Slide direction='left' in={isOpen} style={{ zIndex: 10 }}>
        <Box
          position={"absolute"}
          ref={sidebarRef}
          display={isOpen ? "flex" : "none"}
          flexDirection={"column"}
          borderRight={"1px solid white"}
          justifyContent={"space-between"}
          py={"20px"}
          px={"20px"}
          width={"300px"}
          height={"100vh"}
          backgroundColor={"black"}
          zIndex={10}
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
      </Slide>
    </>
  );
};

export default SideBar;
