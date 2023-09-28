import React, { useEffect, useState } from "react";
import Section from "../Layout/Section";
import {
  Box,
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  ChakraProvider,
  Tooltip,
} from "@chakra-ui/react";
import KeyValuePair from "../DataDisplay/KeyValuePair";
import { marked } from "marked";
// const theme = extendBaseTheme({
//   components: {
//     Modal,
//   },
// });

export interface IBasicInfo {
  id: string;
  title: string;
  status: string;
  description: string;
  turnout: string;
}

const scrollbarStyle = {
  "&::-webkit-scrollbar": {
    width: "5px",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "gray",
    borderRadius: "10px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "gray.400",
  },
};

const BasicInfo = ({ id, title, status, description, turnout }: IBasicInfo) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [parsedHTML, setParsedHTML] = useState("");

  useEffect(() => {
    if (description) {
      const html = marked(description);
      // console.log(html, description);
      setParsedHTML(html);
      (document.getElementById("description") as HTMLElement).innerHTML = html;
    }
  }, [description, isOpen]);

  const handleModalOpen = () => {
    onOpen();
    console.log(document.getElementById("description-modal"));

    (document.getElementById("description-modal") as HTMLElement).innerHTML =
      parsedHTML;
  };

  return (
    <>
      <Section heading={`#${id}. ${title}`}>
        <Flex flexDirection={"column"} gap={"20px"}>
          <Flex gap={"10px"} justifyContent={"space-between"} width={"100%"}>
            <KeyValuePair keyField="Current Status" value={status} />
            <KeyValuePair
              keyField="Turnout/Quorom"
              value={`${turnout}%/33.4%`}
            />
            <KeyValuePair keyField="Proposal expected to" value="PASS" />
          </Flex>
          <Flex
            fontSize={"1.2rem"}
            alignItems={"flex-start"}
            flexDirection={"column"}
            gap={"10px"}
            position={"relative"}
          >
            <Tooltip content="Expand">
              <Button
                bg={"whiteAlpha.700"}
                sx={{
                  position: "absolute",
                  top: "50px",
                  right: "10px",
                  cursor: "pointer",
                }}
                onClick={handleModalOpen}
              >
                <span className="material-symbols-outlined">open_in_full</span>
              </Button>
            </Tooltip>
            <Text>Description</Text>
            <Box
              bg={"rgba(255, 255, 255, 0.10)"}
              maxH={"300px"}
              overflowY={"scroll"}
              p={"25px"}
              borderRadius={"15px"}
              sx={scrollbarStyle}
              textAlign={"left"}
              color={"#bfbfbf"}
              width={"100%"}
            >
              <Box id="description" fontSize={"1.1rem"}>
                {/* {description && marked(description)} */}
              </Box>
            </Box>
          </Flex>
        </Flex>
      </Section>
      <Modal size={"xxl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          width={"80%"}
          bg={"rgba(255, 255, 255, 0.05)"}
          backdropFilter={"blur(20px)"}
          padding={"15px"}
        >
          <ModalHeader>{`#${id}. ${title}`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box
              dangerouslySetInnerHTML={{ __html: parsedHTML }}
              id="description-modal"
              fontSize={"1.1rem"}
            >
              {/* {description && marked(description)} */}
            </Box>
            {/* <Lorem count={2} /> */}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BasicInfo;
