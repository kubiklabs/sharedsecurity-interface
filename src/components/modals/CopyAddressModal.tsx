import React from "react";

import {
  Box,
  Button,
  Tooltip,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Heading,
  isStyleProp,
} from "@chakra-ui/react";
import { useRecoilValue } from "recoil";
import { walletState } from "../../context/walletState";
import AddressDisplay from "../DataDisplay/AddressDisplay";

const CopyAddressModal = ({ isOpen, onClose }: any) => {
  const addresses = useRecoilValue(walletState);
  return (
    <Modal isCentered size={"lg"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        width={"80%"}
        borderRadius={"10px"}
        bg={"#17151A"}
        // padding={"15px"}
        px={"30px"}
        py={"30px"}
        color={"#bfbfbf"}
        maxH={"90vh"}
        overflow={"auto"}
      >
        <ModalHeader py={"10px"}>
          <Heading color={"white"} textAlign={"center"}>
            Wallet Addresses
          </Heading>
        </ModalHeader>
        <ModalCloseButton
          _focus={{
            outline: "none",
            border: "none",
          }}
        />
        <ModalBody
          pt={"10px"}
          display={"flex"}
          flexDirection={"column"}
          gap={"20px"}
        >
          {Object.keys(addresses).map((chain) => {
            if (chain === "isLoggedIn" || chain === "name") return <></>;
            return (
              <AddressDisplay
                key={chain}
                name={chain}
                address={addresses[chain as keyof typeof addresses]}
              />
            );
          })}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CopyAddressModal;
