/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useRef, useState } from "react";
import Section from "@/components/Layout/Section";
import {
  Box,
  Flex,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Tooltip,
} from "@chakra-ui/react";
import { marked } from "marked";
import {
  cosmosStatusMap,
  neutronStatusMap,
  scrollbarStyle,
  tagColorMap,
} from "@/utils/constant";
import ColorTag from "@/components/DataDisplay/ColorTag";
import StatusTags from "@/components/PrettyUI/StatusTags/StatusTags";

export interface IBasicInfo {
  id: string;
  title: string;
  status: string;
  description: string;
  turnout: string;
  threshold: string;
  quorom: string;
  vetoVotes: string;
  yesVotes: string;
}

export interface IBasicInfoPropsWithChainDetails extends IBasicInfo {
  chain: string;
}

const commonStatusMap = { ...neutronStatusMap, ...cosmosStatusMap };

const BasicInfo = ({
  id,
  title,
  status,
  description,
  turnout,
  quorom,
  vetoVotes,
  yesVotes,
  chain
}: IBasicInfoPropsWithChainDetails) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [parsedHTML, setParsedHTML] = useState("");

  useEffect(() => {
    const changeToHtml=async()=>{
      const html = await marked(description);
      setParsedHTML(html);
      (document.getElementById("description") as HTMLElement).innerHTML = html;
    }
    if (description) {
      changeToHtml()
    }
  },[]);
  useEffect(() => {
    const changeToHtml=async()=>{
      const html = await marked(description);
      setParsedHTML(html);
      (document.getElementById("description") as HTMLElement).innerHTML = html;
    }
    if (description) {
      changeToHtml()
    }
  }, [description, isOpen]);

  const handleModalOpen = () => {
    onOpen();

    document.getElementById('description-modal') ? (document.getElementById("description-modal") as HTMLElement).innerHTML = parsedHTML:"";
  };

  const isPassing = useRef(
    Number(turnout) > Number(quorom) &&
      Number(vetoVotes) < 33 &&
      Number(yesVotes) >= 50
  );

  return (
    <>
      <Section
        heading={`#${id}. ${title}`}
        sideText={
          <Flex gap={"10px"} ml={"40px"}>
            <ColorTag
              borderStyle={`1px solid ${
                tagColorMap[chain as keyof typeof tagColorMap]
              }`}
              content={chain as string}
              bgColor={tagColorMap[chain as keyof typeof tagColorMap]}
            />
            <StatusTags
              status={commonStatusMap[status as keyof typeof commonStatusMap]}
            />
          </Flex>
        }
      >
        <Flex flexDirection={"column"} gap={"30px"}>
          <Flex gap={"20px"} color={"#BFBFBF"} alignItems={"center"}>
            {commonStatusMap[status as keyof typeof commonStatusMap]?.pretty ===
              "Vote Now" && (
              <>
                <Text fontSize={"16px"} display={"flex"}>
                  Proposal Expected to &nbsp;
                  <Text color={isPassing.current ? "#0aa12f" : "#CE3747"}>
                    {isPassing.current ? "PASS" : "FAIL"}
                  </Text>
                </Text>
                <Text color={"#37343D"} fontSize={"1.6rem"}>
                  |
                </Text>
              </>
            )}

            <Text fontSize={"16px"}>
              {turnout}% / {quorom}% : Turnout / Quorum
            </Text>
          </Flex>
          <Flex
            fontSize={"1.2rem"}
            alignItems={"flex-start"}
            flexDirection={"column"}
            gap={"15px"}
            position={"relative"}
          >
            <Tooltip content="Expand">
              <Button
                fontSize={"10px"}
                _focus={{
                  bg: "#c9c9c991",
                }}
                bg={"#c9c9c991"}
                sx={{
                  position: "absolute",
                  top: "50px",
                  right: "10px",
                  cursor: "pointer",
                }}
                onClick={handleModalOpen}
              >
                <span
                  style={{
                    fontSize: "20px",
                  }}
                  className="material-symbols-outlined"
                >
                  open_in_full
                </span>
              </Button>
            </Tooltip>
            <Text fontSize={"20px"}>Description</Text>
            <Box
              bg={"rgba(255, 255, 255, 0.10)"}
              maxH={"400px"}
              overflowY={"scroll"}
              p={"25px"}
              px={"50px"}
              borderRadius={"15px"}
              sx={scrollbarStyle}
              textAlign={"left"}
              color={"#bfbfbf"}
              width={"100%"}
            >
              <Box
                id="description"
                fontSize={"16px"}
                display={"flex"}
                flexDirection={"column"}
                gap={"20px"}
              >
              </Box>
            </Box>
          </Flex>
        </Flex>
      </Section>
      <Modal size={"xxl"} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          width={"80%"}
          borderRadius={"15px"}
          bg={"#201d27"}
          padding={"15px"}
          px={"40px"}
          color={"#bfbfbf"}
          maxH={"90vh"}
          overflow={"auto"}
          sx={scrollbarStyle}
        >
          <ModalHeader>{`#${id}. ${title}`}</ModalHeader>
          <ModalCloseButton
            _focus={{
              border: "none",
            }}
          />
          <ModalBody>
          <Box
              dangerouslySetInnerHTML={{ __html: parsedHTML }}
              id="description-modal"
              fontSize={"1.1rem"}
              display={"flex"}
              flexDirection={"column"}
              gap={"15px"}
            >
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default BasicInfo;
