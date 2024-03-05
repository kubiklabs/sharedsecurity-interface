import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  useDisclosure,
  Image,
  Text,
} from "@chakra-ui/react";
import logo from "../../assets/kubik-logo.png";

const LoadingModal = ({
  isOpen,
  content,
}: {
  isOpen: boolean;
  content: Array<String>;
}) => {
  const { onClose } = useDisclosure();

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay bg={"transparent"} backdropBlur={"30px"} />
      <ModalContent
        maxWidth={"350px"}
        width={"90%"}
        color={"gray"}
        bg={"black"}
      >
        <ModalHeader textAlign={"center"} fontSize={"13px"}>
          {" "}
          Txn in progress. Please do not press back button or refresh the page.
        </ModalHeader>
        <ModalBody
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Image
            animation={"animation-b7n1on  4s infinite"}
            src={'/images/kubik-logo.png'}
            width={"7rem"}
            alt="loading"
          />
        </ModalBody>

        <ModalFooter
          gap={"10px"}
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
        >
          <Text>{content[0]}</Text>
          <Text fontWeight={"800"} fontSize={"20px"}>
            {content[1]}
          </Text>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default LoadingModal;