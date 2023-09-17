import { Box, SystemStyleObject } from "@chakra-ui/react";
import React from "react";

const ColorTag = ({
  content,
  bgColor,
  sx,
}: {
  content: string;
  bgColor: string;
  sx?: SystemStyleObject | undefined;
}) => {
  return (
    <Box
      sx={sx}
      m={"0"}
      borderRadius={"4px"}
      //   py={"5px"}
      pt={"1px"}
      px={"5px"}
      bg={bgColor}
      fontSize={"0.8rem"}
      width={"fit-content"}
    >
      {content}
    </Box>
  );
};

export default ColorTag;
