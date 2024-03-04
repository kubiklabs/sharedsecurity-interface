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

  useEffect(() => { }, [selected.length]);
  // onClear();

  const clickItemHandler = (
    item: string,
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    let bufferSelection = selected;
    if (bufferSelection.find((selection) => selection === item)) {
      // To deselect
      if (item === "ALL") bufferSelection = [];
      else {
        bufferSelection = bufferSelection.filter(
          (selection) => selection !== item && selection !== "ALL"
        );
      }
    } else {
      // To select
      if (item === "ALL") bufferSelection = data;
      else
        bufferSelection = bufferSelection.concat(item);

      if(item!="ALL" && bufferSelection.length === data.length-1) bufferSelection=data;
    }
    onChange(category, bufferSelection);
  };

  return (
    <Flex alignItems={"start"} flexDir={"column"} color={"#BFBFBF"} gap={"15px"}>
      <Box>
        <Text width={"max-content"} color={"#BFBFBF"} fontSize={"1.2rem"}> {category.charAt(0).toUpperCase() + category.slice(1)}(s)</Text>
      </Box>
      <Flex columnGap={"15px"} rowGap={"15px"} flexWrap={"wrap"}>
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
                  : "#FFFFFF33"
              }
              borderRadius={"5px"}
              paddingY={"10px"}
              paddingX={"15px"}
              key={item}
            >
              <Text color={"white"} fontSize={"1rem"} id={category}>{item}</Text>
            </Box>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default SelectFilters;
