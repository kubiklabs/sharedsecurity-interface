import { Box, Heading, Text } from "@chakra-ui/react";

const SectionHeading = ({
  heading,
  subtitle,
  sideText,
  sideTextPos,
}: {
  heading: string;
  subtitle: string;
  sideText: string;
  sideTextPos?: string;
}) => {
  return (
    <Box
      px={"10px"}
      flexDirection={"column"}
      display={"flex"}
      textAlign={"left"}
    >
      <Box
        justifyContent={sideTextPos === "apart" ? "space-between" : "normal"}
        display={"flex"}
        gap={"10px"}
        alignItems={"end"}
      >
        <Heading size={"20px"} margin={"0px"}>
          {heading}
        </Heading>
        <Text margin={"0"} mb={"3px"} fontSize={"16px"} color={"gray"}>
          {sideText}
        </Text>
      </Box>
      <Box>
        <Text color={"gray"} margin={"0"} fontSize={"14px"}>
          {subtitle}
        </Text>
      </Box>
    </Box>
  );
};

export default SectionHeading;
