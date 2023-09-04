import { Box, Flex, Stack, Text } from "@chakra-ui/react";

export interface IVpCardProps {
  votePercent: string;
  amountStaked: string;
  denom: string;
  accountAddress: string;
  totalParticipated: string;
  totalValidators: string;
}

const VpCard = ({
  accountAddress,
  amountStaked,
  denom,
  totalParticipated,
  totalValidators,
  votePercent,
}: IVpCardProps) => {
  return (
    <Box
      width={"300px"}
      bg={"rgba(255, 255, 255, 0.05)"}
      padding={"30px"}
      // paddingY={"20px"}
      borderRadius={"10px"}
    >
      <Stack justifyContent={"center"} gap={"0"}>
        <Text m={"0 "} color={"rgba(255, 255, 255, 0.40)"}>
          Voting Power on Cosmos
        </Text>
        <Text margin={"0"} fontSize={"2rem"}>
          {votePercent}
        </Text>
        <Flex alignItems={"center"} justifyContent={"center"} gap={"5px"}>
          <Text>
            {amountStaked} {denom}
          </Text>
          <Text color={"rgba(255, 255, 255, 0.40)"}>{accountAddress}</Text>
        </Flex>
        <Flex alignItems={"center"} justifyContent={"center"} gap={"5px"}>
          <Text color={"rgba(255, 255, 255, 0.40)"} margin={"0"}>
            Proposal Participated
          </Text>
          <Text m={"0"}>
            {totalParticipated}/{totalValidators}
          </Text>
        </Flex>
        <Box
          m={"10px"}
          width={"90%"}
          height={"5px"}
          borderRadius={"5px"}
          bg={"green"}
        ></Box>
      </Stack>
    </Box>
  );
};

export default VpCard;
