import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const SelectFilters = ({
  category,
  data,
  onChange,
  selected,
}: {
  category: string;
  data: string[];
  selected: string[];
  onChange: (category: string, selected: string[]) => void;
}) => {
  // const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {}, [selected.length]);
  // onClear();

  const clickItemHandler = (
    item: string,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    let bufferSelection = selected;
    if (bufferSelection.find((selection) => selection === item)) {
      bufferSelection = bufferSelection.filter(
        (selection) => selection !== item
      );
      // setSelected(bufferSelection);
    } else {
      bufferSelection = bufferSelection.concat(item);
      // setSelected(bufferSelection);
    }
    onChange(category, bufferSelection);
  };

  return (
    <Flex alignItems={"center"} gap={"50px"}>
      <Box>
        <Text width={"max-content"}> Select a {category}(s)</Text>
      </Box>
      <Flex columnGap={"20px"} rowGap={"10px"} flexWrap={"wrap"}>
        {data?.map((item) => {
          return (
            <Box
              cursor={"pointer"}
              width={"fit-content"}
              onClick={(e) => clickItemHandler(item, e)}
              border={"1px solid"}
              borderColor={
                selected.find((selection) => selection === item)
                  ? "#BC3D70"
                  : "white"
              }
              borderRadius={"5px"}
              padding={"10px"}
              key={item}
            >
              <Text id={category}>{item}</Text>
            </Box>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default SelectFilters;
