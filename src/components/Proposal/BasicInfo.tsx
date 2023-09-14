import React, { useEffect } from "react";
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
} from "@chakra-ui/react";
import KeyValuePair from "../DataDisplay/KeyValuePair";
import { marked } from "marked";

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

  useEffect(() => {
    if (description) {
      const html = marked(description);
      // console.log(html, description);

      (document.getElementById("description") as HTMLElement).innerHTML = html;
    }
  }, [description]);
  return (
    <>
      <Section heading={`#${id}. ${title}`}>
        <Flex flexDirection={"column"}>
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
          >
            <Text>Description</Text>
            <Box
              bg={"rgba(255, 255, 255, 0.10)"}
              maxH={"300px"}
              overflowY={"scroll"}
              px={"25px"}
              borderRadius={"15px"}
              sx={scrollbarStyle}
              textAlign={"left"}
              color={"#bfbfbf"}
              position={"relative"}
            >
              <span
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                }}
                className="material-symbols-outlined"
                onClick={onOpen}
              >
                open_in_full
              </span>
              <Box id="description" fontSize={"1.1rem"}>
                {/* {description && marked(description)} */}
              </Box>
            </Box>
          </Flex>
        </Flex>
      </Section>
      <Modal
        isCentered
        motionPreset="slideInBottom"
        isOpen={isOpen}
        onClose={onClose}
        size={"lg"}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{`#${id}. ${title}`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Helllkdhduifh</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BasicInfo;
