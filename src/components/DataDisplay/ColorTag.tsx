import { Box, SystemStyleObject } from "@chakra-ui/react";
import React from "react";

const ColorTag = ({
  content,
  bgColor,
  borderStyle,
  sx,
}: {
  content: string;
  bgColor: string;
  borderStyle?: string;
  sx?: SystemStyleObject | undefined;
}) => {
  return (
    <Box
      sx={sx}
      m={"0"}
      borderRadius={"4px"}
      //   py={"5px"}
      py={"3px"}
      px={"12px"}
      bg={bgColor}
      border={borderStyle}
      fontSize={"14px"}
      width={"fit-content"}
      color={"white"}
    >
      {content}
    </Box>
  );
};

export default ColorTag;
