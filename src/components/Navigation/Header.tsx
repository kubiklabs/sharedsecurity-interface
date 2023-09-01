import { Box } from "@chakra-ui/react";
import ConnectWalletButton from "../Buttons/ConnectWalletButton";

const Header = () => {
  return (
    <Box
      position={"fixed"}
      top={"0"}
      //   width={"100%"}
      paddingY={"5px"}
      paddingX={"10px"}
    >
      <ConnectWalletButton />
    </Box>
  );
};

export default Header;
