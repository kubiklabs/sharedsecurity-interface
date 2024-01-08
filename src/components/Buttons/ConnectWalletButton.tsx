import { useState } from "react";
import { useRecoilValue } from "recoil";

import { walletState } from "../../context/walletState";
import {
  useConnectWallet,
  useDisconnetWallet,
} from "../../hooks/useConnectWallet";
import { coinConvert } from "../../utils/common";
import { Box, Button, Center, Spinner, Tooltip } from "@chakra-ui/react";
import CopyAddressModal from "../modals/CopyAddressModal";

const ConnectWalletButton = () => {
  const { isLoggedIn, name } = useRecoilValue(walletState);
  const connectWallet = useConnectWallet();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const connectHandler = async () => {
    setIsLoading(true);
    await connectWallet();

    setIsLoading(false);
  };

  const resetUserData = useDisconnetWallet();

  const openAddressModal = () => {
    setIsModalOpen(true);
  };

  // const copyAddress = () => {
  //   navigator.clipboard.writeText(address || "");
  //   // Success("Address copied to clipboard!");
  // };

  return (
    <>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        fontSize={"1.2rem"}
        // width={"100%"}
        gap={"5px"}
        width={"100%"}
        bg={"transparent"}
        color={"white"}
        border={"1px solid white"}
        borderRadius={"10px"}
        px={"20px"}
        py={"8px"}
      >
        {isLoading ? (
          <Center py={"8px"} width={"100%"}>
            <Spinner />
          </Center>
        ) : !isLoggedIn ? (
          <Button
            fontSize={"1.2rem"}
            bg={"transparent"}
            color={"white"}
            width={"100%"}
            onClick={connectHandler}
            _hover={{
              bg: "white.600",
              borderColor: "white",
            }}
            overflow={"hidden"}
          >
            Connect Keplr
          </Button>
        ) : (
          <>
            {
              <Button
                color={"white"}
                bg={"transparent"}
                disabled
                style={{ height: "100%" }}
                flex={1}
                fontSize={"1.2rem"}
                _hover={{
                  bg: "white.600",
                }}
                py={"8px"}
              >
                {name}
              </Button>
            }
            <Box display={"flex"} gap={"10px"}>
              <Tooltip label="Copy Addresses">
                <span
                  onClick={openAddressModal}
                  className="material-symbols-outlined copy-address-icon"
                >
                  content_copy
                </span>
              </Tooltip>
              <Tooltip label="Disconnect">
                <span
                  onClick={resetUserData}
                  className="material-symbols-outlined logout-logo"
                >
                  logout
                </span>
              </Tooltip>
            </Box>
          </>
        )}
      </Box>
      <CopyAddressModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default ConnectWalletButton;
