import { useState } from "react";
import { useRecoilValue } from "recoil";

import { walletState } from "../../context/walletState";
import {
  useConnectWallet,
  useDisconnetWallet,
} from "../../hooks/useConnectWallet";
import { coinConvert } from "../../utils/common";
import { Box, Tooltip } from "@chakra-ui/react";
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
        <button>Loading...</button>
      ) : !isLoggedIn ? (
        <button onClick={connectHandler}>Connect Keplr</button>
      ) : (
        <>
          {
            <button style={{ height: "100%" }} onClick={connectHandler}>
              {name}
            </button>
          }
          <Tooltip label="Disconnect">
            <button>
              <span
                onClick={resetUserData}
                className="material-symbols-outlined logout-logo"
              >
                logout
              </span>
            </button>
          </Tooltip>
        </>
      )}
    </Box>
  );
};

export default ConnectWalletButton;
