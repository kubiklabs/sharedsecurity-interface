import {
  Button,
  ButtonGroup,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Stack,
  useDisclosure,
  ModalHeader,
  ModalCloseButton,
  border
} from "@chakra-ui/react";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import SelectFilters from "../Input/SelectFilters/SelectFilters";

const CHAINS = ["COSMOS", "NEUTRON", "STRIDE"];
const TYPE = [
  "ALL",
  "Software Upgrade",
  "Text",
  "Equivocation",
  "Community Pool Spend",
  "Consumer Addition",
  "Parameter Change",
  "Client Update",
];
const RESULT = ["ALL","Passed", "Failed", "Executed", "Rejected"];

const IN_FIL = {
  chain: [],
  type: [],
  result: [],
};

export type I_InFil = typeof IN_FIL;

const FilterModal = ({
  isPopoverOpen,
  setIsPopoverOpen,
  onFilterApply,
}: {
  isPopoverOpen: boolean;
  setIsPopoverOpen: Dispatch<SetStateAction<boolean>>;
  onFilterApply: (allFilters: I_InFil) => void;
}) => {
  const { isOpen, onToggle, onClose } = useDisclosure();

  const [selectedFilters, setSelectedFilters] = useState(IN_FIL);

  useEffect(() => {
    if (isPopoverOpen !== isOpen) {
      onToggle();
    }
    // console.log(isPopoverOpen);
  }, [isPopoverOpen]);

  const handleClosePopover = () => {
    setIsPopoverOpen(false);
    onClose();
  };

  const handleChange = (category: string, selected: string[]) => {
    const newSelected = { ...selectedFilters, [category]: selected };
    console.log(newSelected);

    setSelectedFilters(newSelected);
  };

  const handleClear = () => {
    setSelectedFilters(IN_FIL);
  };

  const applyFilters = () => {
    onFilterApply(selectedFilters);
    handleClosePopover();
  };

  return (
    <Modal size={"2xl"} isCentered isOpen={isOpen} onClose={handleClosePopover}>
      <ModalOverlay />
      <ModalContent bg={"#17151A"} paddingX={"30px"} paddingY={"20px"}>
        <ModalHeader fontSize={"2rem"}>Filters</ModalHeader>
        <ModalCloseButton border={"none"} margin={"35px"} fontSize={"1rem"} _focus={{ outline: "none" }} />
        <ModalBody p={"25px"}>
          <Stack gap={"30px"}>
            <SelectFilters
              selected={selectedFilters.chain}
              onChange={handleChange}
              category={"chain"}
              data={CHAINS}
            />
            <SelectFilters
              selected={selectedFilters.type}
              onChange={handleChange}
              category={"type"}
              data={TYPE}
            />
            <SelectFilters
              selected={selectedFilters.result}
              onChange={handleChange}
              category={"result"}
              data={RESULT}
            />
          </Stack>
        </ModalBody>
        <ModalFooter>
          <ButtonGroup size="md">
            <Button onClick={handleClear} bg={"transparent"} borderWidth={"2px"} borderColor={"#BC3D70"} paddingX={"28px"} color={"white"} paddingY={"7px"}
              _hover={
                {
                  bg: '#BC3D70',
                  borderColor: '#BC3D70'
                }
              }
            >
              Clear
            </Button>
            <Button onClick={applyFilters} bgColor={"#BC3D70"} paddingX={"28px"} color={"white"} paddingY={"7px"} _hover={{
              bg: '#BC3D70',
            }}>
              Apply
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FilterModal;
