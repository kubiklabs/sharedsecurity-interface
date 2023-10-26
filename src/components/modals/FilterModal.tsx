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
  "Software Upgrade",
  "Text",
  "Equivocation",
  "Community Pool Spend",
  "Consumer Addition",
  "Parameter Change",
  "Client Update",
];
const RESULT = ["Passed", "Failed", "Executed", "Rejected"];

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
      <ModalContent bg={"#17151A"}>
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
          <ButtonGroup size="sm">
            <Button onClick={handleClear} colorScheme="blue" variant="outline">
              Clear
            </Button>
            <Button onClick={applyFilters} colorScheme="pink">
              Apply
            </Button>
          </ButtonGroup>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FilterModal;
