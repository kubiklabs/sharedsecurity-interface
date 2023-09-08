import { Box } from "@chakra-ui/react";
import ConnectWalletButton from "../Buttons/ConnectWalletButton";
import DropDown from "../Input/DropDown";

const Header = () => {
  return (
    <Box
      position={"fixed"}
      top={"0"}
      //   width={"100%"}
      paddingY={"5px"}
      paddingX={"0px"}
      width={"100%"}
      display={"flex"}
      justifyContent={"flex-end"}
      gap={"10px"}
    >
      <ConnectWalletButton />
      <DropDown />
    </Box>
  );
};

export default Header;
