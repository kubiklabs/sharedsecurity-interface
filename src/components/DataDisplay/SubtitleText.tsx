import { Text, TextProps } from "@chakra-ui/react";
import React from "react";

const SubtitleText = (props: TextProps) => {
  return (
    <Text {...props} m={"0 "} color={"#B3B3B3"}>
      {props.children}
    </Text>
  );
};

export default SubtitleText;
