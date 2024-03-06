import { Box, Flex, Text } from "@chakra-ui/react";
import { useState } from "react";
import logo from "../../assets/kubik-logo.png";
import {
  useConnectWallet,
  useDisconnetWallet,
} from "../../hooks/useConnectWallet";

export interface IChainInfoMinimal {
  id: string;
  name: string;
  type: string;
  imgSrc: string;
}

const NETWORKS = [
  {
    id: "cosmoshub-4",
    name: "Cosmos Hub",
    type: "mainnet",
    imgSrc: logo,
  },
  {
    id: "neutron-1",
    name: "Neutron",
    type: "mainnet",
    imgSrc: logo,
  },
  {
    id: "stride-1",
    name: "Stride",
    type: "mainnet",
    imgSrc: logo,
  },
];

const DropDown = () => {
  const [activeOption, setActiveOption] = useState<string>(NETWORKS[0].name);
  const [isOpen, setIsOpen] = useState(false);
  const connectWallet = useConnectWallet();
  const disconnectWallet = useDisconnetWallet();

  const handleNetworkChange = async (item: IChainInfoMinimal) => {
    // setIsOpen(false);
    if (item.name === activeOption) return;
    setActiveOption(item.name);
    localStorage.setItem("activeNetworkChainId", item.id);
    disconnectWallet();
    // await connectWallet();
  };

  return (
    <Box
      width={"200px"}
      bg={"#1a1a1a"}
      borderRadius={"10px"}
      cursor={"pointer"}
      position={"relative"}
      onClick={() => setIsOpen((prev) => !prev)}
    >
      <Box>
        <Text>{activeOption}</Text>
      </Box>
      {isOpen ? (
        <Box
          top={"50px"}
          position={"absolute"}
          width={"250px"}
          bg={"#1a1a1a"}
          borderRadius={"10px"}
          p={"20px"}
          display={"flex"}
          gap={"10px"}
          flexDirection={"column"}
          right={"0"}
        >
          {NETWORKS.map((item) => {
            return (
              <Box
                display={"flex"}
                onClick={() => handleNetworkChange(item)}
                id={item.id}
                alignItems={"center"}
                flexDirection={"column"}
              >
                <Flex gap={"5px"} alignItems={"center"}>
                  <Text m={"0"} fontSize={"1.5rem"}>
                    {item.name}
                  </Text>
                  <Box
                    m={"0"}
                    borderRadius={"10px"}
                    //   py={"5px"}
                    pb={"3px"}
                    px={"5px"}
                    bg={"green"}
                    fontSize={"0.9rem"}
                  >
                    {item.type}
                  </Box>
                </Flex>
                <Text m={"0"} color={"gray"}>
                  {item.id}
                </Text>
              </Box>
            );
          })}
        </Box>
      ) : null}
    </Box>
  );
};

export default DropDown;
