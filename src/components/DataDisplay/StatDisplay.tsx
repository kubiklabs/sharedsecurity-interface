import {
  Center,
  Spinner,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Text,
} from "@chakra-ui/react";
import React from "react";

const satisfiedBgMap = {
  yes: {
    bg: "#409f4e2e",
    borderColor: "#007000",
  },
  no: {
    bg: "#9700004a",
    borderColor: "#9d0000",
  },
};

const StatDisplay = ({
  label,
  number,
  helpText,
  isSatisfied = "na",
  showSatisfiedBg,
  bg,
  numberTitle,
}: {
  label: string;
  number: string;
  helpText?: string;
  isSatisfied?: string;
  showSatisfiedBg?: boolean;
  bg?:string,
  numberTitle?: string;
}) => {
  return (
    <Stat
      minW={"200px"}
      bg={
        showSatisfiedBg
          ? satisfiedBgMap[isSatisfied as keyof typeof satisfiedBgMap].bg
          : bg?
          bg
          : "rgba(255, 255, 255, 0.05)"
      }
      gap={"20px"}
      borderRadius={"10px"}
      alignItems={"center"}
      display={"flex"}
      flexDirection={"column"}
      textAlign={"center"}
      p={"15px"}
    >
      <StatLabel color={"#B3B3B3"} fontSize={"14px"} fontWeight={400} noOfLines={1}>{label}</StatLabel>
      <StatNumber
        display={"flex"}
        alignItems={"center"}
        pt={"10px"}
        m={"0"}
        fontSize={"1.1rem"}
        justifyContent={"center"}
        gap={"15px"}
        width={"100%"}
      >
        {number=="NaN%"? (<Center><Spinner/></Center>) :<Text flex={"1"}>{number}{" "}</Text> }
        {
          numberTitle && (
            <Text>
              {numberTitle}
            </Text>
          ) 
        }
        {isSatisfied !== "na" ? (
          <span
          style={{
            color:
              isSatisfied === "na"
                ? "white"
                : satisfiedBgMap[isSatisfied as keyof typeof satisfiedBgMap]
                    .borderColor,
          }}
            className="material-symbols-outlined"
          >
            {isSatisfied === "yes" ? "done" : "close"}
          </span> 
        ) : null}
      </StatNumber>

      <StatHelpText>{helpText}</StatHelpText>
    </Stat>
  );
};

export default StatDisplay;
