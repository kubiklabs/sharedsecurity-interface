import { Box } from "@chakra-ui/react";
import React from "react";

const ColorTag = ({
  content,
  bgColor,
}: {
  content: string;
  bgColor: string;
}) => {
  return (
    <Box
      m={"0"}
      borderRadius={"4px"}
      //   py={"5px"}
      pt={"1px"}
      px={"5px"}
      bg={bgColor}
      fontSize={"0.8rem"}
    >
      {content}
    </Box>
  );
};

export default ColorTag;
