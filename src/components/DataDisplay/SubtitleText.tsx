import { Text } from "@chakra-ui/react";
import React from "react";

const SubtitleText = (props: any) => {
  return (
    <Text {...props} m={"0 "} color={"rgba(255, 255, 255, 0.40)"}>
      {props.children}
    </Text>
  );
};

export default SubtitleText;
