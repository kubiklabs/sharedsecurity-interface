import { Text } from "@chakra-ui/react";
import React from "react";

const SubtitleText = (props: any) => {
  return (
    <Text {...props} m={"0 "} color={"#B3B3B3"}>
      {props.children}
    </Text>
  );
};

export default SubtitleText;
