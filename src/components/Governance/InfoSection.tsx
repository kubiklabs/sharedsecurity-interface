import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import SubtitleText from "../DataDisplay/SubtitleText";

const InfoSection = () => {
  return (
    <Box
      padding={"50px"}
      bg={"rgba(255, 255, 255, 0.05)"}
      borderRadius={"10px"}
      marginX={"15px"}
    >
      <Heading m={"0"} textAlign={"left"}>
        Get Involved
      </Heading>
      <Flex>
        <SubtitleText mb={"0"} maxWidth={"60%"} textAlign={"left"}>
          To learn more about proposals and governance of the chains{" "}
          <a>click here</a>. For regular updates and discussions, join the
          community on Discord or on the Forum.
        </SubtitleText>
        <Box></Box>
      </Flex>
    </Box>
  );
};

export default InfoSection;
