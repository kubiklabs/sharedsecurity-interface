import React from "react";
import Section from "../Layout/Section";
import { Box, Flex, Stack, Text, Tooltip, VStack } from "@chakra-ui/react";
import { IVoteValueProps } from "../../utils/interface";
import { bigSmallTextColorMap, colorVoteMap } from "../../utils/constant";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { FaQuestion } from "react-icons/fa";
import { BsQuestion } from "react-icons/bs";

const satisfiedBgMap = {
  yes: {
    color: "#409F4E",
    icon: <TiTick size={"1.6rem"} />,
  },
  no: {
    color: "#CE3747",
    icon: <RxCross2 size={"1.6rem"} />,
  },
  na: {
    color: "white",
    icon: <BsQuestion size={"1.6rem"} />,
  },
};

interface IRequirements {
  turnout: string | undefined;
  quorom: string | undefined;
  yesVotes: string | undefined;
  vetoVotes: string | undefined;
}

const Requirements = ({
  turnout,
  quorom,
  yesVotes,
  vetoVotes,
}: IRequirements) => {
  const isTurnOutQuoromSatisfied =
    turnout && quorom === undefined
      ? "na"
      : Number(turnout) >= Number(quorom)
      ? "yes"
      : "no";
  const isYesSatisfied =
    yesVotes === undefined ? "na" : Number(yesVotes) >= 50 ? "yes" : "no";
  const isVetoSatisfied =
    vetoVotes === undefined ? "na" : Number(vetoVotes) >= 33 ? "no" : "yes";

  return (
    <Stack gap={"10px"}>
      <Text fontSize={"24px"} color={"#D9D9D9"} textAlign={"left"}>
        Requirements
      </Text>
      <VStack color={"#409F4E"} fontSize={"16px"} align="stretch">
        <Box
          display={"flex"}
          alignItems={"center"}
          color={
            satisfiedBgMap[
              isTurnOutQuoromSatisfied as keyof typeof satisfiedBgMap
            ].color
          }
          gap={"10px"}
        >
          {
            satisfiedBgMap[
              isTurnOutQuoromSatisfied as keyof typeof satisfiedBgMap
            ].icon
          }
          <Text>
            Turnout threshold is {quorom}%. {turnout}% have voted.
          </Text>
        </Box>
        <Box
          display={"flex"}
          color={
            satisfiedBgMap[isYesSatisfied as keyof typeof satisfiedBgMap].color
          }
          alignItems={"center"}
          gap={"10px"}
        >
          {satisfiedBgMap[isYesSatisfied as keyof typeof satisfiedBgMap].icon}
          <Text>
            {isYesSatisfied === "na"
              ? "N/A"
              : isYesSatisfied === "yes"
              ? "More"
              : "Less"}{" "}
            than 50.0% have voted 'Yes', excluding 'Abstain'.
          </Text>
        </Box>
        {vetoVotes && (
          <Box
            display={"flex"}
            color={
              satisfiedBgMap[isVetoSatisfied as keyof typeof satisfiedBgMap]
                .color
            }
            alignItems={"center"}
            gap={"10px"}
          >
            {
              satisfiedBgMap[isVetoSatisfied as keyof typeof satisfiedBgMap]
                .icon
            }
            <Text>
              {isVetoSatisfied === "na"
                ? "N/A"
                : isYesSatisfied === "yes"
                ? "Less"
                : "More"}{" "}
              than 33.4% have voted 'Veto'.
            </Text>
          </Box>
        )}
      </VStack>
    </Stack>
  );
};

export default Requirements;
