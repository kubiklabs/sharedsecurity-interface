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
      fontSize={"0.9rem"}
      width={"fit-content"}
    >
      {content}
    </Box>
  );
};

export default ColorTag;
