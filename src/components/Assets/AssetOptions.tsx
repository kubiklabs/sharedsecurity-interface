import { Flex } from "@chakra-ui/react";
type propsType = {
  options: string[];
  handleChange: (option: string) => void;
  selectedOption: string;
};
const AssetOptions = ({ options, handleChange, selectedOption }: propsType) => {
  return (
    <Flex width={"100%"} justifyContent={"center"} alignItems={"center"}>
      <Flex
        width={"max-content"}
        border={"1px solid #17131E"}
        borderRadius={"20px"}
        backgroundColor={"#17131E"}
      >
        {options.map((option, index) => (
          <Flex
            justifyContent={"center"}
            alignItems={"center"}
            key={index}
            onClick={() => handleChange(option)}
            cursor={"pointer"}
            paddingY={"0.5rem"}
            paddingX={"1.3rem"}
            textTransform={"capitalize"}
            borderRadius={"20px"}
            backgroundColor={`${
              selectedOption === option ? "rgb(53 49 61)" : ""
            }`}
          >
            {option}
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default AssetOptions;
