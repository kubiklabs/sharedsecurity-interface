import { Box, Stack, Text, Flex, Button } from "@chakra-ui/react";
import SubtitleText from "@/components/DataDisplay/SubtitleText";
import ColorTag from "@/components/DataDisplay/ColorTag";
import BigSmallText from "@/components/DataDisplay/BigSmallText";
import {
  borderTagColorMap,
  colorVoteMap,
  cosmosStatusMap,
  neutronStatusMap,
  tagColorMap,
} from "@/utils/constant";
import { IVoteValueProps } from "@/utils/interface";
import { useRouter } from "next/navigation";
import { convertDateFormat } from "@/utils/common";
import { removeSecondsFromTime } from "@/utils/common";

export interface ILpCardProps {
  proposalId: string;
  proposalTitle: string;
  endDate: string;
  endTime: string;
  tags: Array<string>;
  status: string;
  voteDistribution: any;
  showButtons?: boolean;
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
  showButtons = true,
}: ILpCardProps) => {
  const router = useRouter();
  return (
    <Box
      border={`2px solid ${
        borderTagColorMap[tags[0] as keyof typeof tagColorMap]
      }`}
      bg={"rgba(255, 255, 255, 0.05)"}
      padding={"30px"}
      borderRadius={"10px"}
      onClick={() => router.push(`/gov/${tags[0]}/${proposalId}`)}
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
          <Flex flexDirection={"column"} maxW={showButtons ? "60%" : "90%"}>
            <Text
              overflow={"hidden"}
              whiteSpace={"nowrap"}
              textOverflow={"ellipsis"}
              textAlign={"left"}
              m={"0"}
              fontSize={"20px"}
            >{`#${proposalId}. ${proposalTitle}`}</Text>
            <SubtitleText textAlign={"left"} fontSize={"14px"}>
              voting ends on : {convertDateFormat(endDate)}{" "}
              {removeSecondsFromTime(endTime)}
            </SubtitleText>
          </Flex>
          {showButtons && (
            <Button
              fontSize={"14px"}
              color={"white"}
              bg={
                (
                  cosmosStatusMap[status as keyof typeof cosmosStatusMap] ||
                  neutronStatusMap[status as keyof typeof neutronStatusMap]
                )?.bg
              }
              _hover={{
                border: `1px solid white`,
              }}
              height={"40px"}
            >
              {
                (
                  cosmosStatusMap[status as keyof typeof cosmosStatusMap] ||
                  neutronStatusMap[status as keyof typeof neutronStatusMap]
                )?.pretty
              }
            </Button>
          )}
        </Flex>
        <Flex gap={"5px"}>
          {tags.map((tag) => {
            return (
              <ColorTag key={tag}
                borderStyle={`1px solid ${
                  tagColorMap[tags[0] as keyof typeof tagColorMap]
                }`}
                content={tag}
                bgColor={tagColorMap[tag as keyof typeof tagColorMap]}
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
              <Box key={vote}
                width={`${voteDistribution[vote as keyof IVoteValueProps]}%`}
                height={"5px"}
                bg={colorVoteMap[vote as keyof typeof colorVoteMap].color}
              ></Box>
            );
          })}
        </Box>
        <Flex gap={"20px"} flexWrap={"wrap"}>
          {Object.keys(voteDistribution).map((vote) => {
            return (
              <BigSmallText key={vote}
                color={colorVoteMap[vote as keyof typeof colorVoteMap].color}
                bigText={
                  voteDistribution[vote as keyof IVoteValueProps] === "NaN"
                    ? "-"
                    : voteDistribution[vote as keyof IVoteValueProps]
                }
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
