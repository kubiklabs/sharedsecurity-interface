import { Box, Stack, Text, Flex, Button } from "@chakra-ui/react";
import Section from "../Layout/Section";
import SubtitleText from "../DataDisplay/SubtitleText";
import ColorTag from "../DataDisplay/ColorTag";
import BigSmallText from "../DataDisplay/BigSmallText";

export interface ILpCardProps {
  proposalId: string;
  proposalTitle: string;
  endDate: string;
  endTime: string;
  tags: Array<string>;
  voteDistribution: Array<Number>;
}
("");
const LpCard = ({
  endDate,
  endTime,
  proposalId,
  proposalTitle,
  tags,
  voteDistribution,
}: ILpCardProps) => {
  return (
    <Box
      maxWidth={"fit-content"}
      bg={"rgba(255, 255, 255, 0.05)"}
      padding={"30px"}
      // paddingY={"20px"}
      borderRadius={"10px"}
    >
      <Stack justifyContent={"center"} gap={"10px"}>
        <Flex
          gap={"10px"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Flex flexDirection={"column"}>
            <Text
              textAlign={"left"}
              m={"0"}
              fontSize={"1.1rem"}
            >{`#${proposalId}. ${proposalTitle}`}</Text>
            <SubtitleText>
              voting ends on : {endDate} : {endTime}
            </SubtitleText>
          </Flex>
          <Button bg={"#BC3D70"} height={"40px"}>
            Vote Now
          </Button>
        </Flex>
        <Flex gap={"5px"}>
          <ColorTag
            bgColor="rgba(255, 139, 74, 0.80)"
            content="Software Update"
          />
          <ColorTag bgColor="rgba(156, 108, 255, 0.80)" content="Cosmos" />
        </Flex>
        <Box
          my={"10px"}
          width={"100%"}
          height={"5px"}
          borderRadius={"5px"}
          bg={"green"}
        ></Box>
        <Flex gap={"20px"}>
          <BigSmallText color="green" bigText="96.11%" smallText="YES" />
          <BigSmallText color="red" bigText="1.21%" smallText="NO" />
          <BigSmallText color="orange" bigText="1.59%" smallText="VETO" />
          <BigSmallText color="white" bigText="1.09%" smallText="ABSTAIN" />
        </Flex>
      </Stack>
    </Box>
  );
};

export default LpCard;
