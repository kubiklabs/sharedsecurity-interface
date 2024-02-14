import { Box, Heading, Text } from "@chakra-ui/react";

const SectionHeading = ({
  heading,
  headingSize = "32px",
  headingColor = "white",
  subtitle,
  subtitleSize = "14px",
  subtitleColor = "gray",
  sideText,
}: {
  heading: string;
  headingSize?: string;
  headingColor?: string;
  subtitle: string;
  subtitleSize?: string;
  subtitleColor?: string;
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
        <Heading fontSize={headingSize} textColor={headingColor} margin={"0px"}>
          {heading}
        </Heading>
        <Text margin={"0"} fontSize={"1.5rem"} color={"gray"}>
          {sideText}
        </Text>
      </Box>
      <Box>
        <Text color={subtitleColor} margin={"0"} fontSize={subtitleSize}>
          {subtitle}
        </Text>
      </Box>
    </Box>
  );
};

export default SectionHeading;
