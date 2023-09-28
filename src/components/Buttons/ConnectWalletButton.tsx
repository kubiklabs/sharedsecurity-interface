import { useState } from "react";
import { useRecoilValue } from "recoil";

import { walletState } from "../../context/walletState";
import {
  useConnectWallet,
  useDisconnetWallet,
} from "../../hooks/useConnectWallet";
import { coinConvert } from "../../utils/common";
import { Box, Button, Tooltip } from "@chakra-ui/react";
// import "./buttons.css";
// import PulseLoader from "react-spinners/PulseLoader";
// import { useMessageToaster } from "../../../hooks/useMessageToaster";

const ConnectWalletButton = () => {
  // const { isLoggingIn } = useContext(UserContext);
  const { isLoggedIn, name } = useRecoilValue(walletState);
  const connectWallet = useConnectWallet();
  // const { Success } = useMessageToaster();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // let buttonName =
  //   shortAddress === undefined ? "Connect Wallet" : (shortAddress as string);
  // if ((window as any).keplr === undefined) {
  //   buttonName = "Install Keplr";
  // }

  // console.log(Cosmos, Neutron, Stride);

  const connectHandler = async () => {
    setIsLoading(true);
    await connectWallet();

    setIsLoading(false);
  };

  const resetUserData = useDisconnetWallet();

  // const copyAddress = () => {
  //   navigator.clipboard.writeText(address || "");
  //   // Success("Address copied to clipboard!");
  // };

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      // width={"100%"}
      gap={"5px"}
    >
      {isLoading ? (
        <Button color={"white"} bg={"#BC3D70"}>
          Loading...
        </Button>
      ) : !isLoggedIn ? (
        <Button onClick={connectHandler}>Connect Keplr</Button>
      ) : (
        <>
          {
            <Button style={{ height: "100%" }} onClick={connectHandler}>
              {name}
            </Button>
          }
          <Tooltip label="Disconnect">
            <Button color={"white"} bg={"#BC3D70"}>
              <span
                onClick={resetUserData}
                className="material-symbols-outlined logout-logo"
              >
                logout
              </span>
            </Button>
          </Tooltip>
        </>
      )}
    </Box>
  );
};

export default ConnectWalletButton;
