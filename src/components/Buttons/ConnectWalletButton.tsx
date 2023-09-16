import { useState } from "react";
import { useRecoilValue } from "recoil";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";

// import { UserContext } from "../../../context/userState";
import { walletState } from "../../context/walletState";
import {
  useConnectWallet,
  useDisconnetWallet,
} from "../../hooks/useConnectWallet";
import { coinConvert } from "../../utils/common";
import { Box } from "@chakra-ui/react";
// import "./buttons.css";
// import PulseLoader from "react-spinners/PulseLoader";
// import { useMessageToaster } from "../../../hooks/useMessageToaster";

const ConnectWalletButton = () => {
  // const { isLoggingIn } = useContext(UserContext);
  const { Cosmos, Neutron, Stride, isLoggedIn } = useRecoilValue(walletState);
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
      gap={"1px"}
    >
      {isLoading ? (
        <button>Loading...</button>
      ) : !isLoggedIn ? (
        <button onClick={connectHandler}>Connect Keplr</button>
      ) : (
        <>
          {/* {address && <button onClick={connectHandler}>{nickName}</button>}
          {" | "}
          <button onClick={connectHandler}>{shortAddress}</button>
          {" | "}
          <button>
            SCRT{" "}
            <span>{coinConvert(balance?.amount as string, 6, "human")}</span>
          </button>

          {" | "}
          <button className="column-gap">
            <span onClick={copyAddress} className={`address-copy-wrapper`}>
              <FontAwesomeIcon icon={faCopy} size="1x" />
            </span>
          </button>
          {"|"} */}
          <button>
            <span
              onClick={resetUserData}
              className="material-symbols-outlined logout-logo"
            >
              logout
            </span>
          </button>
        </>
      )}
    </Box>
  );
};

export default ConnectWalletButton;
