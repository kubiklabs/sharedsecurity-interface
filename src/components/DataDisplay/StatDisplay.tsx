import { Stat, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/react";
import React from "react";

const StatDisplay = ({
  label,
  number,
  helpText,
}: {
  label?: String;
  number?: String;
  helpText?: String;
}) => {
  return (
    <Stat
      minW={"200px"}
      bg={"rgba(255, 255, 255, 0.05)"}
      p={"20px"}
      borderRadius={"10px"}
      alignItems={"center"}
      display={"flex"}
      flexDirection={"column"}
      textAlign={"center"}
    >
      <StatLabel color={"gray"}>{label}</StatLabel>
      <StatNumber m={"0"} fontSize={"1.5rem"}>
        {number}
      </StatNumber>
      <StatHelpText>{helpText}</StatHelpText>
    </Stat>
  );
};

export default StatDisplay;
