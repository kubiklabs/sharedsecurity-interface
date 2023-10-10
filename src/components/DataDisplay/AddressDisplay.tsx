import { Flex, Text, Tooltip } from "@chakra-ui/react";
import React from "react";
import { toast } from "react-toastify";
import { getShortHandAddress } from "../../utils/common";

const AddressDisplay = ({ name, address }: any) => {
  const copyAddress = () => {
    navigator.clipboard.writeText(address || "");
    toast.success("Address copied to clipboard!");
  };
  return (
    <Flex fontSize={"20px"} justifyContent={"space-between"}>
      <Flex color={"white"}>{name.toUpperCase()}</Flex>
      <Flex gap={"10px"}>
        <Text>{getShortHandAddress(address)}</Text>
        <Tooltip label="Copy Addresses">
          <span
            onClick={copyAddress}
            className="material-symbols-outlined copy-address-icon"
          >
            content_copy
          </span>
        </Tooltip>
      </Flex>
    </Flex>
  );
};

export default AddressDisplay;
