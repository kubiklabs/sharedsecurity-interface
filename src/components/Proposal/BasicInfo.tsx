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
import {
  cosmosStatusMap,
  neutronStatusMap,
  scrollbarStyle,
  tagColorMap,
} from "../../utils/constant";
import ColorTag from "../DataDisplay/ColorTag";
import { useParams } from "react-router-dom";
import StatusTags from "../PrettyUI/StatusTags/StatusTags";
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
  threshold: string;
  quorom: string;
}

const commonStatusMap = { ...neutronStatusMap, ...cosmosStatusMap };

const BasicInfo = ({
  id,
  title,
  status,
  description,
  turnout,
  threshold,
  quorom,
}: IBasicInfo) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [parsedHTML, setParsedHTML] = useState("");
  const { chain } = useParams();

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
          <Flex gap={"10px"}>
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
          <Flex gap={"10px"}></Flex>
          <Flex gap={"10px"} width={"100%"}>
            <KeyValuePair
              keyField="Turnout/Quorom"
              value={`${turnout}%/${quorom}%`}
            />
            {commonStatusMap[status as keyof typeof commonStatusMap]?.pretty ===
              "Vote Now" && (
              <KeyValuePair keyField="Proposal expected to" value="PASS" />
            )}{" "}
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
            <Text fontSize={"2xl"}>Description</Text>
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
                fontSize={"1.1rem"}
                display={"flex"}
                flexDirection={"column"}
                gap={"20px"}
              >
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
          borderRadius={"15px"}
          bg={"#201d27"}
          // backdropFilter={"blur(20px)"}
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
