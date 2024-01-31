import { Box, Heading, Text } from "@chakra-ui/react";

const SectionHeading = ({
  heading,
  subtitle,
  sideText,
}: {
  heading: string;
  subtitle: string;
  sideText: string;
}) => {
  return (
    <Box
      px={"10px"}
      flexDirection={"column"}
      display={"flex"}
      textAlign={"left"}
    >
      <Box display={"flex"} gap={"10px"} alignItems={"end"}>
        <Heading size={"24px"} margin={"0px"}>
          {heading}
        </Heading>
        <Text margin={"0"} fontSize={"1.5rem"} color={"gray"}>
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
