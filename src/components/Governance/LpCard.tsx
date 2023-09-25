import { Box, Stack, Text, Flex, Button } from "@chakra-ui/react";
import Section from "../Layout/Section";
import SubtitleText from "../DataDisplay/SubtitleText";
import ColorTag from "../DataDisplay/ColorTag";
import BigSmallText from "../DataDisplay/BigSmallText";
import {
  bigSmallTextColorMap,
  cosmosStatusMap,
  neutronStatusMap,
  tagColorMap,
} from "../../utils/constant";
import { IVoteValueProps } from "../../utils/interface";
import { useNavigate } from "react-router-dom";

export interface ILpCardProps {
  proposalId: string;
  proposalTitle: string;
  endDate: string;
  endTime: string;
  tags: Array<string>;
  status: string;
  voteDistribution: any;
}
("");
const LpCard = ({
  endDate,
  endTime,
  proposalId,
  proposalTitle,
  tags,
  voteDistribution,
  status,
}: ILpCardProps) => {
  const navigate = useNavigate();
  return (
    <Box
      // maxWidth={"fit-content"}
      border="2px solid rgba(156, 108, 255, 0.20)"
      bg={"rgba(255, 255, 255, 0.05)"}
      padding={"30px"}
      // paddingY={"20px"}
      borderRadius={"10px"}
      onClick={() => navigate(`/gov/${tags[0]}/${proposalId}`)}
      _hover={{
        transform: "scale(1.01)",
        cursor: "pointer",
        background: "rgba(255, 255, 255, 0.1)",
      }}
      transition={"ease-in-out 100ms"}
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
            <SubtitleText textAlign={"left"}>
              voting ends on : {endDate} : {endTime}
            </SubtitleText>
          </Flex>
          <Button
            bg={
              (
                cosmosStatusMap[status as keyof typeof cosmosStatusMap] ||
                neutronStatusMap[status as keyof typeof neutronStatusMap]
              )?.bg
            }
            height={"40px"}
          >
            {
              (
                cosmosStatusMap[status as keyof typeof cosmosStatusMap] ||
                neutronStatusMap[status as keyof typeof neutronStatusMap]
              )?.pretty
            }
          </Button>
        </Flex>
        <Flex gap={"5px"}>
          {tags.map((tag) => {
            return (
              <ColorTag
                content={tag}
                bgColor={
                  tagColorMap[tag as keyof typeof tagColorMap] ||
                  "rgba(255, 139, 74, 0.80)"
                }
              />
            );
          })}
        </Flex>
        <Box
          display={"flex"}
          my={"10px"}
          width={"100%"}
          height={"5px"}
          borderRadius={"5px"}
          overflow={"hidden"}
        >
          {Object.keys(voteDistribution).map((vote) => {
            return (
              <Box
                // my={"10px"}
                width={`${voteDistribution[vote as keyof IVoteValueProps]}%`}
                height={"5px"}
                // borderRadius={"5px"}
                bg={bigSmallTextColorMap[vote as keyof IVoteValueProps]}
              ></Box>
            );
          })}
        </Box>
        <Flex gap={"20px"}>
          {Object.keys(voteDistribution).map((vote) => {
            return (
              <BigSmallText
                color={bigSmallTextColorMap[vote as keyof IVoteValueProps]}
                bigText={voteDistribution[vote as keyof IVoteValueProps]}
                smallText={vote}
              />
            );
          })}
        </Flex>
      </Stack>
    </Box>
  );
};

export default LpCard;
